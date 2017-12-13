import React, { Component } from 'react';
import app from 'app';
import { connect } from 'react-redux';

import {
  createRTC,
  createOffer,
  receiveOffer,
  cancelCall,
  callIncoming,
  acceptCall,
  rejectCall,
  callAccepted,
  startUserMedia,
  updateRemoteStream
} from './redux';

import MakingCall from './components/MakingCall';
import IncomingCall from './components/IncomingCall';

export class CallController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  componentDidMount() {
    require('webrtc-adapter');
    this.createRTC();
    // use service for call data that needs to persists
    app.service('calls')
      .on('created', (Call) => {
        this.props.callIncoming();
      })
    // // use socket for signalling and call data that does not need to persist
    // // custom event listeners are defined on the backend so that only sockets in
    // // the room and on the call can receive webRTC session descriptions, streams, etc.
    // socket.on('ice candidate', (candidate) => {
    //   if(candidate) {
    //     this.props.localRTC.addIceCandidate(candidate).then(() => {
    //       console.log('ICE candidate added: ', candidate);
    //     }).catch(() => {
    //       console.log('ICE candidate failed: ', candidate);
    //     })
    //   }
    // });
    //
    // socket.on('call accepted', () => {
    //   this.props.callAccepted();
    //   this.createOffer();
    // });
    //
    // socket.on('receive offer', (peerDescription) => {
    //   this.receiveOffer(peerDescription)
    //   .then((localDescription) => socket.emit('send description', localDescription));
    // });
    //
    // socket.on('receive description', (description) => {
    //   const desc = new RTCSessionDescription(description);
    //   this.props.localRTC.setRemoteDescription(desc);
    // });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.makingCall || nextProps.incomingCall && !this.state.modalOpen) {
      this.setState({ modalOpen: true });
    }
  }

  createRTC = () => {
    this.props.createRTC();
  };

  // user/caller
  cancelCall = () => {
    this.props.cancelCall(this.props.callId);
  }

  // peer/receiver
  acceptCall = () => {
    socket.emit('accept call');
    this.props.acceptCall(this.props.callId)
  }
  rejectCall = () => {
    this.props.rejectCall(this.props.callId)
  }

  render() {
    return (
      <div>
        {this.props.makingCall ?
          <MakingCall
            modalOpen={this.state.modalOpen}
            peer={this.props.peer}
            cancelCall={this.cancelCall}
          />
            : null}
        {this.props.incomingCall ?
          <IncomingCall
            modalOpen={this.state.modalOpen}
            acceptCall={this.acceptCall}
            rejectCall={this.rejectCall}
            peer={this.props.peer}
          />
            : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const peer = state.rooms.peer;
  return { ...state.calls, peer }
};

export default connect(mapStateToProps, {
  cancelCall,
  callIncoming,
  acceptCall,
  rejectCall,
  startUserMedia,
  callAccepted,
  updateRemoteStream,
  createRTC,
  createOffer,
  receiveOffer
})(CallController)
