'use strict';
var https       = require('https');
var qs          = require('qs');
var Promise     = require('bluebird');
var pkgjson     = require('../package.json');
var logger      = require('./logger');
var ApiError    = require('./errors/api-error.js');

var omiseApiVersion = '2014-07-27';

function httpAuthorization(key) {
  var base64EncodedPubKey = 'Basic ' + new Buffer(key + ':').toString('base64');
  return {
    httpBasic: function() {
      return base64EncodedPubKey;
    }
  }
};

function responseHandler(req, cb, resolve, reject) {
  return req.on('response',
  function(res) {
    var resp = '';
    res.setEncoding('utf8');
    res.on('data',
    function(chunk) {
      resp += chunk;
    });
    res.on('end',
    function() {
      try {
        logger.log('info', resp);
        resp = JSON.parse(resp);
        if (!cb) {
          return resolve(resp);
        }
        cb(null, resp);
      } catch (err) {
        if (!cb) {
          return reject(err);
        }
        cb(err, {});
      }
    });
  });
}

function _makeRequestPromise(options) {
  var PromiseRequest = Promise.method(function(options) {
    return new Promise(function(resolve, reject) {
      _makeRequest(options, null, resolve, reject);
    });
  });
  return function() {
    return PromiseRequest(options);
  }
}

function _makeRequest(options, callback, resolve, reject) {
  var request = https.request(options);
  responseHandler(request, callback, resolve, reject);
  _writeRequestData(request, options)
}

function _writeRequestData(request, options) {
  logger.log('info', 'request data:' + options['data']);
  if (options['data'] !== '') {
    request.write(options['data'], 'utf8');
  }
  request.end();
}

function _httpsRequest(method, options, callback) {
  if (!('path' in options)) {
    throw new ApiError('path and data options are required!')
  }
  var content = prepareContent(options, callback);
  var auth = httpAuthorization(options['key']);
  var requestOptions = {
    host: options['host'] || 'api.omise.co',
    path: options['path'],
    method: method,
    headers: {
      'Authorization': auth.httpBasic(),
      'Accept': content['type'],
      'Content-Type': content['type'],
      'User-Agent': ['OmiseNode/', pkgjson.version, ' ',
                     'OmiseAPI/', omiseApiVersion].join(''),
      'Content-Length': Buffer.byteLength(content['data'], 'utf8')
    },
    data: content['data']
  };

  if (!callback) {
    return _makeRequestPromise(requestOptions)();
  }

  logger.log('info', 'request options: ' + requestOptions);
  _makeRequest(requestOptions, callback)
}

function prepareContent(options, callback) {
  var reqData;
  var contentType;
  var data = options['data'];
  //FIXME: No idea why posting json as body does not work in promise.
  //someone has this issue too e.g. https://github.com/kriskowal/q-io/issues/8
  //should do a research further more.
  if (process.env.FORMPOST === 'true' || !callback) {
    reqData = qs.stringify(data);
    contentType = 'application/x-www-form-urlencoded';
  } else {
    reqData = JSON.stringify(data);
    contentType = 'application/json';
  }
  return {'type': contentType, 'data': reqData || ''};
}

function postRequest(options, callback) {
  _httpsRequest('POST', options, callback);
}

function getRequest(options, callback) {
  _httpsRequest('GET', options, callback);
}

function deleteRequest(options, callback) {
  _httpsRequest('DELETE', options, callback);
}

function patchRequest(options, callback) {
  _httpsRequest('PATCH', options, callback);
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
