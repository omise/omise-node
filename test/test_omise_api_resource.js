const {expect} = require('chai');
const resource = require('../lib/apiResources');

describe('Api Resource', function() {
  describe('#resourceActions', function() {
    it('result must have property retrieve', function(done) {
      const result = resource.resourceActions('balance',
        ['retrieve'],
        {
          host:         'api.omise.co',
          key:          process.env.OMISE_SECRET_KEY,
          omiseVersion: '2015-09-10',
        }
      );
      expect(result).to.have.property('retrieve');
      done();
    });

    it('result must have property create and retrieve', function(done) {
      const result = resource.resourceActions('balance',
        ['create', 'retrieve'],
        {
          host:         'api.omise.co',
          key:          process.env.OMISE_SECRET_KEY,
          omiseVersion: '2015-09-10',
        }
      );
      expect(result).to.have.property('create');
      expect(result).to.have.property('retrieve');
      done();
    });
  });
});
