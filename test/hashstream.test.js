var path = require('path');
var fs = require('fs');

var read = function(fname) {
  var fname = path.join(__dirname, fname);
  return fs.createReadStream(fname);
}

describe('hashstream', function() {

  it.skip('should hash a stream', function() {

  });

  it.skip('should throw error when no argument are given', function() {

  });

  it.skip('should throw error when no callback is given', function() {

  });

  it('should throw error when stream is not readable', function() {

  });

  it.skip('should allow to set digest encoding', function() {

  });

  it.skip('should allow to set hash type', function() {

  });
});
