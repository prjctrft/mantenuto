import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      totalListeners: null,
      popupBlocked: null,
      roomSlug: null
    };
  }

  componentDidMount() {
    // start looking for listener
    this.registerSocketListeners();
    // coming from another page
    if (socket.authenticated) {
      this.startSearch();
    }
    // coming directly on page load
    // wait for socket to authenticate
    if (!socket.authenticated) {
      client.on('authenticated', () => {
        this.service.create({talker: this.props.user});
      })
    }
    window.addEventListener("beforeunload", this.removeConnect)
  }

  componentWillUnmount() {
    debugger;
    window.removeEventListener("beforeunload", this.removeConnect)
    this.removeConnect();
  }

  startSearch = () => {
    this.service.create({talker: this.props.user});
  }

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

  removeConnect = () => {
    this.service.remove(this.props.user);
  }

  listenerFound = () => {
    this.setState({ pipeline: 'listenerFound' });
  }

  listenerNotFound = (totalListeners) => {
    this.setState({ pipeline: 'listenerNotFound', totalListeners });
  }

  roomReady = (roomSlug) => {
    this.setState({ pipeline: 'roomReady', roomSlug });
    setTimeout(() => {
      const roomWindow = this.openRoom();
      if(!roomWindow) {
        return this.setState({pipeline: 'popupBlocked'});
      }
      this.props.push('/');
    }, 1500)
  }

  openRoom = () => {
    const roomSlug = this.state.roomSlug;
    return window.open(`/rooms/${roomSlug}`, `Room ${roomSlug}`, `height=${window.innerHeight},width=${window.innerWidth}`);
  }

  render() {
    if (this.state.pipeline === null) {
      return null;
    }
    return <Talk
      startSearch={this.startSearch}
      totalListeners={this.state.totalListeners}
      pipeline={this.state.pipeline}
      openRoom={this.openRoom}
    />
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
