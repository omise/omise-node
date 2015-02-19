'use strict';
var https       = require('https');
var querystring = require('querystring');
var pkgjson     = require('../package.json');

var logger       = require('./logger');
var ApiError     = require('./errors/api-error.js');
var mergeObjects = require('./utils.js').mergeObjects;

var omiseApiVersion = '2014-07-27';

function httpAuthorization(key) {
  var base64EncodedPubKey = 'Basic ' + new Buffer(key + ':').toString('base64');
  return {
    httpBasic: function() {
      return base64EncodedPubKey;
    }
  }
};

//TODO: state machine interface. e.g. Promise etc.
function responseHandler(req, cb) {
  if (typeof cb !== 'function') {
    return;
  }
  req.on('response',
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
        cb(null, resp);
      } catch (err) {
        cb(err, {});
      }
    });
  });
}

function _httpsRequest(method, options, callback) {
  var reqData = querystring.stringify(options['data']);
  var auth = httpAuthorization(options['key']);
  var requestOptions = {
    host: options['host'] || 'api.omise.co',
    path: options['path'],
    method: method,
    headers: {
      'Authorization': auth.httpBasic(),
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': ['OmiseNode/', pkgjson.version, ' ',
                     'OmiseAPI/', omiseApiVersion].join(''),
      'Content-Length': Buffer.byteLength(reqData)
    }
  };
  logger.log('info', reqData)
  var req = https.request(requestOptions);
  responseHandler(req, callback);
  req.write(reqData);
  req.end();
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

var api = module.exports = {
  post: function(options, callback) {
    if (!('path' in options)) {
      throw new ApiError('path and data are required!')
    }
    postRequest(options, callback);
  },
  get: function(options, callback) {
    getRequest(options, callback);
  },
  destroy: function(options, callback) {
    deleteRequest(options, callback);
  },
  update: function(options, callback) {
    patchRequest(options, callback);
  }
};

module.exports = api;
