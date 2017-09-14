import React, { Component } from 'react';

import { connect } from 'react-redux';

import Talk from './components/Talk';

export class TalkController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pipeline: 'looking'
    }
  }

  componentDidMount() {
    // start looking for listener
    this.registerListeners();
  }

  registerListeners = () => {
    // event: listener found
    socket.on('listener found', this.listenerFound);
      // TODO in Talk action: 'We've found someone for you to talk with!'
    // event: room ready (created OR found)
    socket.on('room ready', this.roomReady)
      // action: 'Headed to your chat room now!'
    // event: listener not found
    socket.on('listener not found', this.listenerNotFound);
      // we're still searching for listeners -> email
      // check back soon!
  }

  listenerFound = () => {
    this.setState({ pipeline: 'listenerFound' });
  }

  roomReady = () => {
    this.setState({ pipeline: 'roomReady' });
  }

  listenerNotFound = () => {
    this.setState({ pipeline: 'listenerNotFound' });
  }

  render() {
    return <Talk pipeline={this.state.pipeline} />
  }
}

export default connect(null)(TalkController);
