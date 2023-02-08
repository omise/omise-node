'use strict';

var https       = require('https');
var http        = require('http');
var query       = require('querystring')
var Promise     = require('bluebird');

var logger      = require('./logger');
var pkgjson     = require('../package.json');

var ApiError    = require('./errors/api-error');

var httpsProxyAgent = require('https-proxy-agent');

function _responseHandler(req) {
  return new Promise(function(resolve, reject) {
    req.on('response', function(res) {
      var resp = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        resp += chunk;
      });
      res.on('end', function() {
        try {
          logger.log('info', resp);
          if(!_isValidJsonString(resp)) {
            reject(resp)
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
  var reqData = JSON.stringify(options['body']) || '';
  var contentType = 'application/json';
  return function() {
    return {
      'type':   contentType,
      'data':   reqData,
      'length': Buffer.byteLength(reqData, 'utf8'),
    };
  };
}

function _authenticate(options) {
  var key = options['key'] + ':';
  var buffer;

  if (Buffer.allocUnsafe) {
    buffer = Buffer.from(key);
  } else {
    buffer = new Buffer(key);
  }

  var base64Encoded = buffer.toString('base64');
  return {'basic': 'Basic ' + base64Encoded};
}

function _getUserAgent(extraUserAgent = '') {
  return [
    'OmiseNode/', pkgjson.version, ' ',
    'Node/', process.version, ' ',
    extraUserAgent
  ].join('').trim()
}

function _prepareOptionsFor(method, options) {
  const content   = _buildContentHeaders(options)();
  let headers = {
    'Authorization':  _authenticate(options)['basic'],
    'Accept':         content['type'],
    'Content-Type':   content['type'],
    'User-Agent':     _getUserAgent(options['userAgent']),
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
  var requestOptions = _prepareOptionsFor(method, options);
  logger.log('info', 'request options: ' + JSON.stringify(requestOptions));

  const protocol = process.env.OMISE_SCHEME || options['scheme'] || 'https';
  const request = protocol == 'http' 
    ? http.request(requestOptions) 
    : https.request(requestOptions);

  var resolve = _responseHandler(request).nodeify(callback);

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
};

module.exports = {
  post:    _httpRequestFactory('post'),
  get:     _httpRequestFactory('get'),
  destroy: _httpRequestFactory('delete'),
  update:  _httpRequestFactory('patch'),
};
