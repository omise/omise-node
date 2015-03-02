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
          resolve(resp);
        } catch (err) {
          reject(err);
        }
      });
    });
  });
}

function _prepareContent(options) {
  var reqData;
  var contentType;
  var data = options['data'];

  if (process.env.FORMPOST === 'true') {
    reqData = querystring.stringify(data);
    contentType = 'application/x-www-form-urlencoded';
  } else {
    reqData = JSON.stringify(data);
    contentType = 'application/json';
  }

  return {'type': contentType, 'data': reqData || ''};
}

function _httpsRequest(method, options, callback) {
  if (!('path' in options)) { throw new ApiError('path is required!'); }

  var key = new Buffer(options['key'] + ':').toString('base64');
  var content = _prepareContent(options);

  var requestOptions = {
    host: options['host'] || 'api.omise.co',
    path: options['path'],
    method: method,
    headers: {
      'Authorization':  'Basic ' + key,
      'Accept':         'application/json',
      'Content-Type':   content['type'],
      'Content-Length': Buffer.byteLength(content['data'], 'utf8'),
      'User-Agent': [
        'OmiseNode/', pkgjson.version, ' ',
        'OmiseAPI/',  omiseApiVersion
      ].join('')
    },
  };

  logger.log('info', 'request options: ' + JSON.stringify(requestOptions));
  var request = https.request(requestOptions);
  var resolve = _responseHandler(request).nodeify(callback);

  if (content['data'] !== '') {
    logger.log('info', 'request data: ' + content['data']);
    request.write(content['data'], 'utf8');
  }

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
