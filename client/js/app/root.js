/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var CaptureClicks = require('react-router-component/lib/CaptureClicks')
var Locations = Router.Locations;
var Location = Router.Location;
var Pages = require('./pages');
var Blog = require('./blog');

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <div className="container">
          <h1><a href="/">ryankaskel.com</a></h1>
        </div>
      </header>
    );
  }
});

var Main = React.createClass({
  render: function() {
    return (
      <main>
        <Locations path={this.props.location.path}>
          <Location path="/" handler={Blog.PostList} />
          <Location path="/blog/:slug" handler={Blog.Post} />
          <Location path="/about" handler={Pages.About} />
          <Location path="/contact" handler={Pages.Contact} />
        </Locations>
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

var Root = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>Marcy</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="/css/app.min.css" />
          <link href="http://fonts.googleapis.com/css?family=Quattrocento+Sans:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
        </head>
        <body>
          <CaptureClicks>
            <Header />
            <Main location={this.props.location} />
            <Footer />
            <script src="/js/bootstrap.js"></script>
          </CaptureClicks>
       </body>
      </html>
    );
  }
});

module.exports = Root;