import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import client, { socket } from 'app';
import { updateUser } from 'modules/user/redux';

import NotRegisteredListener from './components/NotRegisteredListener';
import Connecting from './components/Connecting';
import Preferences from './components/Preferences';


export class ListenComponent extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      listenAnytime: PropTypes.bool.isRequired
    }),
    updateUser: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.service = client.service('listen');
    this.state = {
      onlineTalkers: null
    }
  }

  componentDidMount() {
    if (socket.authenticated) {
      this.startListening();
    }
    // coming directly on page load
    // wait for socket to authenticate
    if (!socket.authenticated) {
      client.on('authenticated', () => {
        this.startListening();
      })
    }
    this.service.on('room ready', this.roomReady);
  }

  startListening = () => {
    this.service.create({listener: this.props.user})
      .then((onlineTalkers) => {
        this.setState({ onlineTalkers })
      });
  }

  roomReady = (roomSlug) => {
    // this.setState({ pipeline: 'roomReady' });
    setTimeout(() => this.props.push(`/rooms/${roomSlug}`), 3000)
  }

  handleAnytime = () => {
    this.props.updateUser(this.props.user.id, {listenAnytime: true });
  }

  handleNow = () => {
    this.props.updateUser(this.props.user.id, {listenAnytime: false });
  }

  render() {
    // TODO don't display preferences if user has already chosen ANYTIME
    if(!this.props.user.listener) {
      return <NotRegisteredListener />
    }
    return (
      <div>
        <Connecting onlineTalkers={this.state.onlineTalkers}/>
        {!this.props.user.listenAnytime ?
          <Preferences handleNow={this.handleNow} handleAnytime={this.handleAnytime} />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, { push, updateUser })(ListenComponent);
