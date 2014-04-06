/** @jsx React.DOM */

var React = require('react');
var Blog = require('./blog');
var PostList = Blog.PostList;

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <div className="container">
          <h1>ryankaskel.com</h1>
        </div>
      </header>
    );
  }
});

var Main = React.createClass({
  render: function() {
    var host = this.props.host;
    var ready = this.props.ready;

    return (
      <main>
        <div className="container">
          <PostList host={host} ready={ready} source="/data/posts.json" />
        </div>
      </main>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (
      <footer>
        <div className="container">
          © 2014 Ryan Kaskel
        </div>
      </footer>
    )
  }
});

var App = React.createClass({
  getDefaultProps: function() {
    return {
      host: '',
      ready: false
    }
  },
  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/css/app.min.css" />
          <link href="http://fonts.googleapis.com/css?family=Quattrocento+Sans:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
          <script src="/js/app.js"></script>
        </head>
        <body>
          <Header />
          <Main host={this.props.host} ready={this.props.ready} />
          <Footer />
       </body>
      </html>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(<App host="" ready="true" />, document);
  }
}
