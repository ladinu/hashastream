var path   = require('path');
var stream = require('stream');
var assert = require('assert');
var fs     = require('fs');

var hashStream = require('../');

var fname  = 'tf0';
var hashes = {
    'sha1' : ['9f6fd4c282035567e042b54e50c51081bf311abb', 'n2/UwoIDVWfgQrVOUMUQgb8xGrs=']
  , 'md5'  : ['78fb701bc318daaef09211b8462addcd']
}


var read = function(fname) {
  var fname = path.join(__dirname, fname);
  return fs.createReadStream(fname);
}

describe('hashstream', function() {

  it('should return a sha1 in hex by default', function(done) {
    hashStream(read(fname), function(err, hash) {
      if (err) return done(err);
      done(assert.strictEqual(hash, hashes.sha1[0]));
    });
  });

  it('should throw error when no argument are given', function() {
    assert.throws(hashStream, Error);
  });

  it('should throw error when no callback is given', function() {
    var file = read(fname);
    var options = {'hash': 'md5'};

    assert.throws(function(){hashStream(file, options)}, Error);
  });

  it('should throw error when stream is not readable', function(done) {
    var strm = new stream();
    strm.writable = true;
    strm.readable = false;

    hashStream(strm, function(err, result) {
      if (err) done(); else done(new Error('was expecting an error'));
    });
  });

  it('should allow to set digest encoding', function(done) {
    hashStream(read(fname), {'digest':'base64'}, function(err, hash) {
      if (err) return done(err);
      done(assert.strictEqual(hash, hashes.sha1[1]));
    });
  });

  it('should allow to set hash type', function(done) {
    hashStream(read(fname), {'digest': 'hex', 'hash': 'md5'}, function(err, hash) {
      if (err) return done(err);
      done(assert.strictEqual(hash, hashes.md5[0]));
    });
  });
});
