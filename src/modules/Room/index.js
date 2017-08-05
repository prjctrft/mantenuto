import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import { replace } from 'react-router-redux';
import { populateUser } from '../App/redux';
import Chat from './components/Chat';
import Controls from './components/Controls';
import Video from './components/Video';

import {
  load,
  checkin,
  checkout,
  roomPatched,
  isListenerUpdate,
  isTalkerUpdate,
  patchRoom,
  setPeer,
  // parseRoom,
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
    peerCheckedIn
  } = state.rooms;
  const id = state.auth.user;
  const { user } = state.user;
  return { peerCheckedIn, peer, user, room, checkedIn, isTalker, isListener, isRoomParsed };
};

@connect(mapStateToProps, {
  replace,
  populateUser,
  isTalkerUpdate,
  isListenerUpdate,
  // checkin,
  // checkout,
  load,
  roomPatched,
  patchRoom,
  setPeer,
  peerCheckIn,
  peerCheckOut,
  parsedRoom,
})
export default class Room extends Component {
  static propTypes = {
    user: PropTypes.object,
    room: PropTypes.object,
    load: PropTypes.func,
    checkin: PropTypes.func,
    params: PropTypes.shape({
      slug: PropTypes.str
    })
  }

  componentDidMount() {
    const roomSlug = this.props.params.slug;
    const peerSocketId = this.props.peerSocketId;
    if (!this.props.user) {
      this.props.populateUser(this.props.id);
    }

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
    if (!nextProps.isRoomParsed && nextProps.room && nextProps.user) {
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
    // const { room, isTalker, isListener } = this.props;
    // const update = {};
    // if(isTalker) {
    //   update.talker = Object.assign(room.talker, { isCheckedIn: false });
    // }
    // if(isListener) {
    //   update.listener =  Object.assign(room.listener, { isCheckedIn: false });
    // }
    // this.props.checkout(room.slug, update);
    socket.emit('leave room');
  }

  handleRemoteVideo = (ref) => {
    this.RemotePlayer = ref;
  }

  handleLocalVideo = (ref) => {
    this.LocalPlayer = ref;
  }

  handleLocalStream = (stream) => {
    this.LocalPlayer.srcObject = stream;
  }

  handleRemoteStream = (stream) => {
    this.RemotePlayer.srcObject = stream;
  }

  renderStats = (styles) => {
    // const peer = this.props.peer;
    const peerCheckedIn = this.props.peerCheckedIn;
    let badge;
    if (peerCheckedIn) {
      badge = <span className={`badge ${styles.BadgeSuccess}`}>Checkedin!</span>;
    }
    if (!peerCheckedIn) {
      badge = <span className='badge default'>Not Checkedin</span>;
    }
    return (
      <h1>{this.props.peer.user.first}{' '}{badge}</h1>
    )
  }

  render() {
    const styles = require('./Styles.scss');
    const { room, user, peer } = this.props;
    if (!room || !user || !peer) {
      return null;
    }
    return (
      <div className="container">
        <div className='row'>
          <div className='col-xs-12 text-center'>
            { this.renderStats(styles) }
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 text-center'>
            <Controls
              styles={styles}
              handleRemoteStream={this.handleRemoteStream}
              handleLocalStream={this.handleLocalStream}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 text-center'>
              <Video
                styles={styles}
                handleRemoteVideo={this.handleRemoteVideo}
                handleLocalVideo={this.handleLocalVideo}
              />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}
