/** @jsx React.DOM */

var React = require('react');

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
          <h1>HTML Ipsum Presents</h1>

          <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>

          <h2>Header Level 2</h2>

          <ol>
            <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
            <li>Aliquam tincidunt mauris eu risus.</li>
          </ol>

          <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>

          <h3>Header Level 3</h3>

          <ul>
            <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
            <li>Aliquam tincidunt mauris eu risus.</li>
          </ul>
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
      <html>
        <head>
          <link rel="stylesheet" href="/css/app.min.css" />
          <link href="http://fonts.googleapis.com/css?family=Quattrocento+Sans:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
          <script src="/js/app.js" />
        </head>
        <body>
          <Header />
          <Main />
          <Footer />
       </body>
      </html>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
      console.log('okay');
    React.renderComponent(App(), document);
  }
}
