import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import client, { socket } from 'app';
import Talk from './components/Talk';

export class TalkController extends Component {
  constructor(props) {
    super(props);
    this.service = client.service('talk');
    this.state = {
      pipeline: null,
      totalListeners: null
    };
  }

  componentDidMount() {
    // start looking for listener
    this.registerSocketListeners();
    // coming from another page
    if (socket.authenticated) {
      this.service.create({talker: this.props.user});
    }
    // coming directly on page load
    // wait for socket to authenticate
    if (!socket.authenticated) {
      client.on('authenticated', () => {
        this.service.create({talker: this.props.user});
      })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if(this.state.pipeline === null && nextProps.socketAuthenticated) {
  //     this.service.create({talker: this.props.user});
  //   }
  // }

  registerSocketListeners = () => {
    this.service.on('created', this.createdConnect)
    // event: listener found
    this.service.on('listener found', this.listenerFound);
      // TODO in Talk action: 'We've found someone for you to talk with!'
    // event: room ready (created OR found)
    this.service.on('room ready', this.roomReady);
      // action: 'Headed to your chat room now!'
    // event: listener not found
    this.service.on('listener not found', this.listenerNotFound);
      // we're still searching for listeners -> email
      // check back soon!
  }

  createdConnect = () => {
    this.setState({ pipeline: 'looking'})
  }

  listenerFound = () => {
    this.setState({ pipeline: 'listenerFound' });
  }

  roomReady = (roomSlug) => {
    this.setState({ pipeline: 'roomReady' });
    setTimeout(() => this.props.push(`/rooms/${roomSlug}`), 3000)
  }

  listenerNotFound = (totalListeners) => {
    this.setState({ pipeline: 'listenerNotFound', totalListeners });
  }

  render() {
    if (this.state.pipeline === null) {
      return null;
    }
    return <Talk totalListeners={this.state.totalListeners} pipeline={this.state.pipeline} />
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

TalkController.propTypes = {
  user: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { push })(TalkController);
