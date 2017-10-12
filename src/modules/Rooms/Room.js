/* eslint-disable */
// TODO: Refactor this garbage
import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import app from 'app';
import { replace } from 'react-router-redux';
import Room from './components/Room';

import {
  load,
  roomPatched,
  isListenerUpdate,
  isTalkerUpdate,
  patchRoom,
  setPeer,
  parsedRoom,
  peerCheckIn,
  peerCheckOut
} from './actions';

const mapStateToProps = (state) => {
  const {
    room,
    checkedIn,
    isTalker,
    isListener,
    peer,
    isRoomParsed,
    peerCheckedIn,
    loaded
  } = state.rooms;
  const { user } = state.user;
  return { loaded, peerCheckedIn, peer, user, room, checkedIn, isTalker, isListener, isRoomParsed };
};

@connect(mapStateToProps, {
  replace,
  isTalkerUpdate,
  isListenerUpdate,
  load,
  roomPatched,
  patchRoom,
  setPeer,
  peerCheckIn,
  peerCheckOut,
  parsedRoom,
})
export default class RoomContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object,
    room: PropTypes.object,
    params: PropTypes.shape({
      slug: PropTypes.str
    }),
    loaded: PropTypes.bool,
    isRoomParsed: PropTypes.bool,
    parsedRoom: PropTypes.bool,
    load: PropTypes.func.isRequired,
    peerCheckIn: PropTypes.func.isRequired,
    peerCheckOut: PropTypes.func.isRequired,
    setPeer: PropTypes.func.isRequired,
    isTalkerUpdate: PropTypes
  }

  componentDidMount() {
    const roomSlug = this.props.params.slug;
    // if(!this.props.user) {
    //   this.props.populateUser(this.props.id);
    // }

    // checkIn
    // receiveEvent if peer is checks in
    // continue to make sure peer is checked in

    this.props.load(roomSlug);
    socket.emit('join room', roomSlug, (peerCheckedIn) => {
      if (peerCheckedIn) {
        this.props.peerCheckIn();
      }
    });
    socket.on('peer checked in', () => {
      this.props.peerCheckIn();
    });
    socket.on('peer checked out', () => {
      this.props.peerCheckOut();
    });
    this.registerListeners();
    window.addEventListener("beforeunload", this.checkout)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isRoomParsed && nextProps.loaded && nextProps.user._id) {
      this.props.parsedRoom();
      const user = nextProps.user;
      const room = nextProps.room;
      let isListener;
      let isTalker;
      let peer;
      if (room.talker.user._id === user._id) {
        isTalker = true;
        peer = room.listener;
      }
      if (room.listener.user._id === user._id) {
        isListener = true;
        peer = room.talker;
      }
      this.props.setPeer(peer);
      const update = {};
      if(isTalker) {
        update.talker = Object.assign(room.talker, {isCheckedIn: true});
        this.props.isTalkerUpdate();
      }
      if(isListener) {
        update.listener =  Object.assign(room.listener, {isCheckedIn: true});
        this.props.isListenerUpdate();
      }
      // this.props.checkin(room.slug, update);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.checkout)
    this.checkout();
  }

  registerListeners() {
    const roomService = app.service('rooms');
    roomService.on('patched', (room) => {
      this.props.roomPatched(room);
      const { isTalker, isListener } = this.props;
      let peer;
      if (isTalker) {
        peer = room.listener;
      }
      if (isListener) {
        peer = room.talker;
      }
      this.props.setPeer(peer);
    });
  }

  checkout = () => {
    socket.emit('leave room');
  }


  render() {
    return <Room />
  }
}
