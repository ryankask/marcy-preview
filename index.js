var util = require('util');
var server = require('./server');
var port = 3000;

server.start(port, function() {
  util.log(util.format('Starting Marcy on port %d', port));
});