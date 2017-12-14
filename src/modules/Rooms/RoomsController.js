import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import app from 'app';
import { replace } from 'react-router-redux';
import { notifSend } from 'modules/Notifs/redux';
import { updateUser } from 'modules/user/redux';
import RoomsLayout from './components/RoomsLayout';

import {
  loadRoom,

  setPeer,

  setIsTalker,
  setIsListener,

  checkInTalker,
  checkInListener,

  checkOutTalker,
  checkOutListener,

  roomPatched,
} from './redux';

export class RoomsControllerComponent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object,
    room: PropTypes.object,
    params: PropTypes.shape({
      slug: PropTypes.str
    }),
    loaded: PropTypes.bool,
    loadRoom: PropTypes.func.isRequired,
    isTalker: PropTypes.bool.isRequired, // logged in user is the talker, peer is listener
    isListener: PropTypes.bool.isRequired, // logged in user is the listener, peer is the talker
    setPeer: PropTypes.func.isRequired, // sets the state.rooms.peer property to the peer user
    checkInTalker: PropTypes.func.isRequired, // sets 'talkerCheckedIn' to true on the room and notifies peer with event
    checkInListener: PropTypes.func.isRequired, // sets 'listenerCheckedIn' to true on the room and notifies peer with event
    checkOutTalker: PropTypes.func.isRequired, // sets 'talkerCheckedIn' to false on the room and notifies peer with event
    checkOutListener: PropTypes.func.isRequired, // sets 'listenerCheckedIn' to false on the room and notifies peer with event
    roomPatched: PropTypes.func.isRequired // updates state with new room object when event listener receives 'patched' event
  }

  componentDidMount() {
    const roomSlug = this.props.params.slug;
    this.props.loadRoom(roomSlug)
      .then(this.checkIn)
      .catch((err) => {
        if(err) {
          this.props.notifSend({kind: 'danger', message: 'There is a problem with this room.  Check the url!'});
        }
      });
    this.registerListeners();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.error && nextProps.error.code === 403) {
      this.props.notifSend({kind: 'danger', message: 'It looks like you have the wrong room.  Can you check the url again?'});
      setTimeout(() => this.props.replace('/'), 2000)
    }
  }

  componentWillUnmount() {
    this.checkout();
  }

  registerListeners() {
    const roomService = app.service('rooms');
    roomService.on('patched', (room) => {
      this.props.roomPatched(room);
    });
  }

  checkIn = () => {
    this.props.updateUser(this.props.userId, { engaged: true });
    if(this.props.isTalker) {
      this.checkInTalker();
    }
    if(this.props.isListener) {
      this.checkInListener();
    }
  }

  checkInTalker = () => {
    const roomSlug = this.props.params.slug;
    this.props.checkInTalker(roomSlug);
  }

  checkInListener = () => {
    const roomSlug = this.props.params.slug;
    this.props.checkInListener(roomSlug);
  }

  checkout = (event) => {
    event.preventDefault();
    const promises = [];
    this.props.updateUser(this.props.userId, { engaged: false });
    if(this.props.isListener) {
      this.checkOutListener()
    }
    if(this.props.isTalker) {
      this.checkOutTalker()
    }
  }

  checkOutTalker = () => {
    const roomSlug = this.props.params.slug;
    return this.props.checkOutTalker(roomSlug);
  }

  checkOutListener = () => {
    const roomSlug = this.props.params.slug;
    return this.props.checkOutListener(roomSlug);
  }

  render() {
    return <RoomsLayout />
  }
}
const mapStateToProps = (state) => {
  const {
    room,
    checkedIn,
    isTalker,
    isListener,
    peer,
    // isRoomParsed,
    // peerCheckedIn,
    loaded,
    error
  } = state.rooms;
  const { user } = state.user;
  const userId = state.auth.user;
  return {
    error,
    isTalker,
    isListener,
    loaded,
    // peerCheckedIn,
    peer,
    user,
    room,
    userId
  };
};

export default connect(mapStateToProps, {
  replace,
  notifSend,
  loadRoom,
  setPeer,
  setIsTalker,
  setIsListener,
  updateUser,
  checkInTalker,
  checkInListener,
  checkOutTalker,
  checkOutListener,
  roomPatched
})(RoomsControllerComponent)
