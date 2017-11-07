import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import app from 'app';
import { replace } from 'react-router-redux';
import { notifSend } from 'modules/Notifs/redux';
import RoomsLayout from './components/RoomsLayout';

import {
  loadRoom,

  setPeer,

  setIsTalker,
  setIsListener,

  // checkInTalker,
  // checkInListener,

  // checkOutTalker,
  // checkOutListener,

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
    // peerCheckIn: PropTypes.func.isRequired,
    // peerCheckOut: PropTypes.func.isRequired,
    setPeer: PropTypes.func.isRequired,
    // isTalkerUpdate: PropTypes
  }

  componentDidMount() {
    const roomSlug = this.props.params.slug;
    this.props.loadRoom(roomSlug)
      .then((room) => {
        const userId = this.props.userId;
        let peer;
        if (userId === room.talker._id) {
          this.props.setIsTalker();
          // this.props.checkInTalker(roomSlug);
          peer = room.listener;
        }
        if (userId === room.listener._id) {
          this.props.setIsListener();
          // this.props.checkInListener(roomSlug);
          peer = room.talker;
        }
        return this.props.setPeer(peer);
      })
      .catch((err) => {
        if(err) {
          this.props.notifSend({kind: 'danger', message: 'There is a problem with this room.  Check the url!'});
        }
      });

    // TODO: reroute through service
    // socket.emit('join room', roomSlug, (peerCheckedIn) => {
    //   if (peerCheckedIn) {
    //     this.props.peerCheckIn();
    //   }
    // });
    // socket.on('peer checked in', () => {
    //   this.props.peerCheckIn();
    // });
    // socket.on('peer checked out', () => {
    //   this.props.peerCheckOut();
    // });
    this.registerListeners();
    window.addEventListener("beforeunload", this.checkout)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.error && nextProps.error.code === 403) {
      this.props.notifSend({kind: 'danger', message: 'It looks like you have the wrong room.  Can you check the url again?'});
      setTimeout(() => this.props.replace('/'), 2000)
    }
  }

  // componentWillUnmount() {
  //   window.removeEventListener("beforeunload", this.checkout)
  //   this.checkout();
  // }

  registerListeners() {
    const roomService = app.service('rooms');
    roomService.on('patched', (room) => {
      this.props.roomPatched(room);
    });
  }

  // checkout = () => {
  //   if(this.props.isListener) {
  //     this.props.checkOutListener()
  //   }
  //   if(this.props.isTalker) {
  //     this.props.checkOutTalker()
  //   }
  // }


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
    loaded,
    // peerCheckedIn,
    peer,
    user,
    room,
    userId
    // checkedIn,
    // isTalker,
    // isListener,
    // isRoomParsed
  };
};

export default connect(mapStateToProps, {
  replace,
  notifSend,

  loadRoom,
  setPeer,
  setIsTalker,
  setIsListener,
  // roomPatched,
  // checkInTalker,
  // checkInListener,
  // checkOutTalker,
  // checkOutListener
  // peerCheckIn,
  // peerCheckOut,
  // parsedRoom,
})(RoomsControllerComponent)
