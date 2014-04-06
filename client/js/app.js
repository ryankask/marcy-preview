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
    return (
      <main>
        <div className="container">
          <PostList ready={this.props.ready} source="/data/posts.json" />
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
  render: function() {
    return (
      <div id="app">
        <Header />
        <Main ready={this.props.ready} />
        <Footer />
      </div>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(<App ready="true" />, document.body);
  }
}
