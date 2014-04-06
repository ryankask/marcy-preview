/** @jsx React.DOM */

var fs = require('fs');
var path = require('path');
var React = require('react');
var ReactAsync = require('react-async');
var request = require('superagent');
var marked = require('marked');
var highlight = require('highlight.js');
var mdCodeLangRegEx = r = /^.*?:::(\w+)\n/;

marked.setOptions({
  highlight: function (code) {
    var matches = code.match(mdCodeLangRegEx);

    if (matches) {
      code = code.slice(matches[0].length);
      return highlight.highlight(matches[1], code).value;
    } else {
      return highlight.highlightAuto(code).value;
    }
  }
});

var Post = React.createClass({
  getInitialState: function() {
    return {
      bodyHtml: ''
    };
  },
  componentWillMount: function() {
    if (this.props.data) {
      this.renderPostBody();
    }
  },
  renderPostBody: function() {
    this.setState({ bodyHtml: marked(this.props.data.body) });
  },
  render: function() {
    var post = this.props.data;
    var bodyHtml = this.state.bodyHtml;

    return (
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{__html: bodyHtml }} />
      </article>
    );
  }
});

var PostList = React.createClass({
  mixins: [ReactAsync.Mixin],
  getInitialStateAsync: function(cb) {
    this.loadPosts(cb);
  },
  loadPosts: function(cb) {
    var source = this.props.source;

    if (!this.props.ready && this.props.host) {
      source = 'http://' + this.props.host + source;
    }

    request.get(source, function (res) {
      if (res.ok) {
        cb(null, { posts: res.body.reverse() });
      } else {
        cb(res.text, null);
      }
    }.bind(this));
  },
  render: function() {
    var posts = this.state.posts.map(function(post) {
      return <Post key={post.id} data={post} />;
    });
    return (
      <div className="posts">
        {posts}
      </div>
    );
  }
});

exports.PostList = PostList;