var crypto = require('crypto');

module.exports = hashstream;
function hashstream(stream, options, callback) {

  if (arguments.length < 2) {
    throw new Error('must provide a stream and a callback');
    return;
  } else if (typeof options === 'function') {
    var callback = options;
    var options  = null;
  }

  var stream   = stream   || {};
  var options  = options  || {'hash': 'sha1', 'digest': 'hex'};
  var callback = callback || null;

  if (!callback) 
    throw new Error('must provide callback');
  if (!stream.readable) 
    callback(new Error('stream must be readable'), null);

  var hash = crypto.createHash(options.hash || 'sha1');

  stream.on('data', function(data) {
    hash.update(data);
  });
  stream.on('end', function() {
    callback(null, hash.digest(options.digest || 'hex'));
  });

  stream.on('error', callback);
}
