var path   = require('path');
var assert = require('assert');
var fs     = require('fs');

var hashStream = require('../');

var fname  = 'tf0';
var hashes = {
    'sha1' : '9f6fd4c282035567e042b54e50c51081bf311abb'
  , 'md5'  : '78fb701bc318daaef09211b8462addcd'
}


var read = function(fname) {
  var fname = path.join(__dirname, fname);
  return fs.createReadStream(fname);
}

describe('hashstream', function() {

  it('should return a sha1 in hex by default', function(done) {
    hashStream(read(fname), function(err, hash) {
      if (err) return done(err);
      done(assert.strictEqual(hash, hashes.sha1));
    });
  });

  it.skip('should throw error when no argument are given', function() {

  });

  it.skip('should throw error when no callback is given', function() {

  });

  it.skip('should throw error when stream is not readable', function() {

  });

  it.skip('should allow to set digest encoding', function() {

  });

  it.skip('should allow to set hash type', function() {

  });
});
