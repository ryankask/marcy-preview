var http = require('http');
var url = require('url');
var staticServer = require('node-static');
var staticFiles = new staticServer.Server('./public');
var React = require('react');
var nodeJsx = require('node-jsx').install()
var App = require('../client/js/app');
var fileExtRegEx = /\.\w+$/;

function renderApp(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(React.renderComponentToString(App()));
}

var server = http.createServer(function(req, res) {
  req.addListener('end', function() {
    staticFiles.serve(req, res, function(err) {
      if (err && err.status === 404) {
        // Render the app if there wasn't a static file found and the
        // the requested path doesn't appear to be a file
        var urlParts = url.parse(req.url);

        if (!fileExtRegEx.test(urlParts.pathname)) {
          renderApp(req, res);
        } else {
          res.writeHead(err.status, err.headers);
          res.end('<h1>404 - Not found</h1>');
        }
    }
    });
  }).resume();
});

exports.start = function(port, cb) {
  server.listen(port || 5000, cb);
};