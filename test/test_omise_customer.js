var chai   = require('chai');
var expect = chai.expect;
var should = chai.should();

var config = require('./config.js');
var omise  = require('../index')(config);

describe('Omise', function() {
  describe('#customers', function() {
    it('should be able to create customer', function(done) {

//curl https://api.omise.co/customers \
  //-X POST \
  //-u skey_test_4yyg6l9b9lbcjknr418: \
  //-d "description=John Doe (id: 30)" \
  //-d "email=john.doe@example.com" \
  //-d "card=token_id"

    })
  })
})
