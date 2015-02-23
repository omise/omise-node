'use strict';
var https       = require('https');
var querystring = require('querystring');
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
  if (!('path' in options)) {
    throw new ApiError('path and data options are required!')
  }
  var content = prepareContent(options);
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
      'Content-Length': Buffer.byteLength(content['data'])
    }
  };
  logger.log('info', content['data'])
  var req = https.request(requestOptions);
  responseHandler(req, callback);
  req.write(content['data']);
  req.end();
}

function prepareContent(options) {
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
  return {'type': contentType, 'data': reqData};
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
