var Promise = require('bluebird');
var React = require('react');
var Root = require('./root');
var App = {};

App.init = function(options) {
  this.path = options.path || '/';
  this.isServer = typeof window === 'undefined';
  return this;
};

App.render = function() {
  var root = Root({
    location: {
      path: this.path
    }
  });
  console.log(this.path);
  if (this.isServer) {
    var render = Promise.promisify(require('react-async').renderComponentToStringWithAsyncState);
    return render(root).then(function(result) {
      return result[0];
    });
  } else {
    window.onload = function () {
      React.renderComponent(root, document);
    }
  };
};

module.exports = App;
