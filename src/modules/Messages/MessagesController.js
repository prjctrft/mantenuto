import React, { Component } from 'react';
import { connect } from 'react-redux';
import app from 'app';

import { addMessage } from './redux';

class MessagesController extends Component {
  componentDidMount() {
    // TODO: can display "unread" messages, urgent messages, etc.
    // when MessagesController mounts
    app.service('messages')
      .on('created', (message) => {
        this.props.addMessage(message);
      });
  }

  render() {
    return null;
  }
}

export default connect(null, { addMessage })(MessagesController)
