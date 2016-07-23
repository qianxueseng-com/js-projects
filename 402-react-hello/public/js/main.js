'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

var mountNode = document.querySelector('#react-app');

ReactDOM.render(<HelloMessage name="John" />, mountNode);
