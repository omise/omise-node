'use strict';

var https       = require('https');
var querystring = require('querystring');
var Promise     = require('bluebird');

var logger      = require('./logger');
var pkgjson     = require('../package.json');

var ApiError    = require('./errors/api-error.js');

var omiseApiVersion = '2014-07-27';

function _responseHandler(req) {
  return new Promise(function(resolve, reject) {
    req.on('response', function(res) {
      var resp = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) { resp += chunk; });
      res.on('end', function() {
        try {
          logger.log('info', resp);
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
    });
  });
}

function _buildContentHeaders(options) {
  var reqData = JSON.stringify(options['body']);
  var contentType = 'application/json';
  return function() {
    return { 'type': contentType,
             'data': reqData || '',
             'length': Buffer.byteLength(reqData, 'utf8')
           };
  }
}

function _authenticate(options) {
  var base64Encoded = new Buffer(options['key'] + ':').toString('base64');
  return { 'basic': 'Basic ' + base64Encoded };
}

function _prepareOptionsFor(method, options) {
  var content = _buildContentHeaders(options)();
  return {
    host: options['host'] || 'api.omise.co',
    path: options['path'],
    method: method,
    headers: {
      'Authorization':  _authenticate(options)['basic'],
      'Accept':         content['type'],
      'Content-Type':   content['type'],
      'Content-Length': content['length'],
      'User-Agent': [
        'OmiseNode/', pkgjson.version, ' ',
        'OmiseAPI/',  omiseApiVersion
      ].join('')
    },
    body: content['data']
  };
}

function _httpsRequest(method, options, callback) {
  if (!('path' in options)) { throw new ApiError('path is required options'); }
  logger.log('info', 'request options: ' + JSON.stringify(requestOptions));
  var requestOptions = _prepareOptionsFor(method, options);
  var request = https.request(requestOptions);
  var resolve = _responseHandler(request).nodeify(callback);
  request.write(requestOptions['body'], 'utf8');
  request.end();
  return resolve;
}

function _httpRequestFactory(method) {
  return function(options, callback) {
    return _httpsRequest(method, options, callback);
  }
}

var api = module.exports = {
  post:    _httpRequestFactory('post'),
  get:     _httpRequestFactory('get'),
  destroy: _httpRequestFactory('delete'),
  update:  _httpRequestFactory('patch')
}
