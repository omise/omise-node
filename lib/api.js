'use strict';

const https       = require('https');
const http        = require('http');
const query       = require('querystring');

const logger      = require('./logger');
const pkgjson     = require('../package.json');

const ApiError    = require('./errors/api-error');

const httpsProxyAgent = require('https-proxy-agent');

const DEFAULT_MAX_NETWORK_RETRY = 0;
const MAX_NETWORK_RETRY_DELAY = 2000; // in ms
const INITIAL_NETWORK_RETRY_DELAY = 500; // in ms

function _processHttpRequest(
  requestOptions,
  maxNetworkRetries,
  totalRetry = 0
) {
  return new Promise(function(resolve, reject) {
    const scheme = process.env.OMISE_SCHEME || requestOptions.scheme;
    const req = scheme == 'http'
      ? http.request(requestOptions)
      : https.request(requestOptions);

    if (_requestMethodWithBody(requestOptions.method)) {
      req.write(requestOptions['body'], 'utf8');
    }

    req.on('response', function(res) {
      _handleHttpResponse(res, resolve, reject);
    }).on('error', (err) => {
      // retry again
      if (totalRetry < maxNetworkRetries) {
        setTimeout(() => {
          return _processHttpRequest(
            requestOptions,
            maxNetworkRetries,
            totalRetry + 1
          ).then(resolve)
            .catch(reject);
        }, _getNetworkRetryDelay(totalRetry));
      } else {
        reject(err);
      }
    }).end();
  });
}

function _handleHttpResponse(response, resolve, reject) {
  let result = '';
  response.setEncoding('utf8');

  response.on('data', function(chunk) {
    result += chunk;
  });

  response.on('end', function() {
    try {
      logger.log('info', result);
      if (!_isValidJsonString(result)) {
        reject(result);
      }
      result = JSON.parse(result);
      if (result.object === 'error') {
        reject(result);
      } else {
        resolve(result);
      }
    } catch (err) {
      reject(err);
    }
  });
}

function _getNetworkRetryDelay(retryCount) {
  // Apply exponential backoff of the retry delay with
  // maximum delay MAX_NETWORK_RETRY_DELAY
  return Math.min(
    MAX_NETWORK_RETRY_DELAY,
    INITIAL_NETWORK_RETRY_DELAY * Math.pow(1.5, retryCount)
  );
}

function _buildContentHeaders(options) {
  const reqData = JSON.stringify(options['body']) || '';
  const contentType = 'application/json';
  return function() {
    return {
      'type':   contentType,
      'data':   reqData,
      'length': Buffer.byteLength(reqData, 'utf8'),
    };
  };
}

function _authenticate(options) {
  const key = options['key'] + ':';
  let buffer;

  if (Buffer.allocUnsafe) {
    buffer = Buffer.from(key);
  } else {
    buffer = new Buffer(key);
  }

  const base64Encoded = buffer.toString('base64');
  return {'basic': 'Basic ' + base64Encoded};
}

function _getUserAgent(extraUserAgent = '') {
  return [
    'OmiseNode/', pkgjson.version, ' ',
    'Node/', process.version, ' ',
    extraUserAgent,
  ].join('').trim();
}

function _prepareOptionsFor(method, options) {
  const content   = _buildContentHeaders(options)();
  const headers = {
    'Authorization': _authenticate(options)['basic'],
    'Accept':        content['type'],
    'Content-Type':  content['type'],
    'User-Agent':    _getUserAgent(options['userAgent']),
  };

  if (options['omiseVersion']) {
    headers['Omise-Version'] = options['omiseVersion'];
  }

  if (_requestMethodWithBody(method)) {
    headers['Content-Length'] = content['length'];
  }

  const proxy = process.env.http_proxy;
  const agent = proxy ? httpsProxyAgent(proxy) : undefined;
  return {
    host:    options['host'] || 'api.omise.co',
    path:    _prepareRequestPath(method, options['path'], options['body']),
    headers: headers,
    method:  method,
    body:    content['data'],
    agent:   agent,
    scheme:  options['scheme'] || 'https',
  };
}

function _httpsRequest(method, options, callback) {
  if (!('path' in options)) {
    throw new ApiError('path is required options');
  }
  const requestOptions = _prepareOptionsFor(method, options);
  logger.log('info', 'request options: ' + JSON.stringify(requestOptions));

  const maxNetworkRetries = options.maxNetworkRetries
    ? options.maxNetworkRetries
    : DEFAULT_MAX_NETWORK_RETRY;

  if (callback) {
    _processHttpRequest(requestOptions, maxNetworkRetries)
      .then((res) => callback(null, res))
      .catch((err) => callback(err, null));
  } else {
    return _processHttpRequest(requestOptions, maxNetworkRetries);
  }
}

function _httpRequestFactory(method) {
  return function(options, callback) {
    return _httpsRequest(method, options, callback);
  };
}

function _requestMethodWithBody(method) {
  return ['post', 'patch'].includes(method);
}

function _prepareRequestPath(method, path, body) {
  if (_requestMethodWithBody(method) || !body) {
    return path;
  }

  return path + '?' + query.encode(body);
}

function _isValidJsonString(json) {
  try {
    JSON.parse(json);
  } catch (e) {
    return false;
  }
  return true;
}

function handleDeprecatedError(callback) {
  console.warn('The .error() method is deprecated. Please use .catch() instead.'); // eslint-disable-line
  return this.catch(callback);
}

function handleDeprecatedDone(callback) {
  console.warn('The .done() method is deprecated. Please use .finally() instead.'); // eslint-disable-line
  return this.finally(callback);
}

Promise.prototype.error = handleDeprecatedError;
Promise.prototype.done = handleDeprecatedDone;

module.exports = {
  post:    _httpRequestFactory('post'),
  get:     _httpRequestFactory('get'),
  destroy: _httpRequestFactory('delete'),
  update:  _httpRequestFactory('patch'),
};
