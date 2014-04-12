var http = require('http');
var url = require('url');
var staticServer = require('node-static');
var staticFiles = new staticServer.Server('./public');
var nodeJsx = require('node-jsx').install();
var App = require('../client/js/app');
var fileExtRegEx = /\.\w+$/;

function renderApp(req, res) {
  var headers = { 'Content-Type': 'text/html' };

  App.init({ path: req.url }).render().then(function(markup) {
    res.writeHead(200, headers);
    res.end(markup);
  }).error(function(err) {
    res.writeHead(500, headers);
    var message = '<h1>Server error.</h1>';
    if (process.env.NODE_ENV !== 'production') {
      message += '<p>' + JSON.stringify(err.stack) + '</p>';
    }
    res.end(message);
  });
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
