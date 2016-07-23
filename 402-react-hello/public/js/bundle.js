'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var HelloMessage = React.createClass({
  render: function () {
    return React.createElement(
      'div',
      null,
      'Hello ',
      this.props.name
    );
  }
});

var mountNode = document.querySelector('#react-app');

ReactDOM.render(React.createElement(HelloMessage, { name: 'John' }), mountNode);

