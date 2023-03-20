'use strict';

const https       = require('https');
const http        = require('http');
const query       = require('querystring');

const logger      = require('./logger');
const pkgjson     = require('../package.json');

const ApiError    = require('./errors/api-error');

const httpsProxyAgent = require('https-proxy-agent');

function _responseHandler(req) {
  return new Promise(function(resolve, reject) {
    req.on('response', function(res) {
      let resp = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        resp += chunk;
      });
      res.on('end', function() {
        try {
          logger.log('info', resp);
          if (!_isValidJsonString(resp)) {
            reject(resp);
          }
          resp = JSON.parse(resp);
          if (resp.object === 'error') {
            reject(resp);
          } else {
            resolve(resp);
          }
        } catch (err) {
          reject(err);
        }
      });
    })
      .on('error', reject);
  });
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
  };
}

function _httpsRequest(method, options, callback) {
  if (!('path' in options)) {
    throw new ApiError('path is required options');
  }
  const requestOptions = _prepareOptionsFor(method, options);
  logger.log('info', 'request options: ' + JSON.stringify(requestOptions));

  const protocol = process.env.OMISE_SCHEME || options['scheme'] || 'https';
  const request = protocol == 'http'
    ? http.request(requestOptions)
    : https.request(requestOptions);

  let resolve;

  if (callback) {
    _responseHandler(request)
      .then((res) => callback(null, res))
      .catch((err) => callback(err, null));
  } else {
    resolve = _responseHandler(request);
  }

  if (_requestMethodWithBody(method)) {
    request.write(requestOptions['body'], 'utf8');
  }

  request.end();

  return resolve;
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
