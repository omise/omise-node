"use strict";
var https       = require('https');
var querystring = require('querystring');
var pkgjson     = require('../package.json');

var logger = require('./logger');
var ApiError = require('./errors/api-error.js');
var omise_api_version = '2014-07-27';
var auth = null;

function httpAuthorization(key) {
  var base64EncodedPubKey = 'Basic ' + new Buffer(key + ':').toString('base64');
  return {
    httpBasic: function(){
      return base64EncodedPubKey;
    }
  }
};

function response_handler(req, cb) {  //TODO: state machine interface. e.g. Promise etc.
  if (typeof cb !== "function")
    return;
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
        logger.log('info', res);
        resp = JSON.parse(resp);
        cb(null, resp);
      } catch(err) {
        cb(err, {});
      }
    });
  });
}

function _httpsRequest(method, options, callback) {
  var req_data = querystring.stringify(options['data']);
  var request_options = {
    host: options['host'] || 'api.omise.co',
    path: options['path'],
    method: method,
    headers: {
      'Authorization': options['headers']['Authorization'],
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'OmiseNode/'+pkgjson.version+' OmiseAPI/'+omise_api_version,
      'Content-Length': Buffer.byteLength(req_data)
    }
  };
  logger.log('info', req_data)
  var req = https.request(request_options);
  response_handler(req, callback);
  req.write(req_data);
  req.end();
}

function post(options, callback) {
  _httpsRequest('POST', options, callback);
}

var api = module.exports = {
  post: function(options, callback) {
    if (!('path' in options) || !('data' in options)) {
      throw new ApiError('path and data are required!')
    }
    var auth = httpAuthorization(options['key']).httpBasic();
    var extend = require('util')._extend;
    var post_options = extend({'headers': {'Authorization': auth}}, options);
    post(post_options, callback);
  }
};

module.exports = api;
