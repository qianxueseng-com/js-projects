import React from 'react';

class MessageView extends React.Component {
  render() {
    return (
      <div className="message">
        <h3>{this.props.message}</h3>
      </div>
    );
  }
}

export default MessageView;
