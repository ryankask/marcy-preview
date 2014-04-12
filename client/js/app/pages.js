/** @jsx React.DOM */

var React = require('react');

var About = React.createClass({
  render: function() {
    return (
      <section className="container">
        <h1>About</h1>
      </section>
    );
  }
});

var Contact = React.createClass({
  render: function() {
    return (
      <section className="container">
        <h1>Contact</h1>
      </section>
    );
  }
});

exports.About = About;
exports.Contact = Contact;