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
      modalOpen: false,
      ring: null
    }
  }

  componentDidMount() {
    require('webrtc-adapter');
    this.createRTC();
    // use service for call data that needs to persists
    app.service('calls')
      .on('created', (Call) => {
        this.props.callIncoming(Call);
      })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.makingCall || nextProps.incomingCall && !this.state.modalOpen) {
      this.setState({ modalOpen: true });
    }
    if(nextProps.makingCall || nextProps.incomingCall) {
      this.startRing();
    }
    if((this.props.makingCall && !nextProps.makingCall) ||
      (this.props.incomingCall && !nextProps.incomingCall)) {
      this.stopRing();
    }
  }

  startRing = () => {
    debugger;
    let { ring } = this.state;
    // if the ring does not exist already (if a call has not yet been made)
    // load it
    if(!ring) {
      ring = new Audio(require('./assets/calling_ring.mp3'));
      this.setState({ ring });
    }
    ring.addEventListener('ended', this.loopAudio, false)
    ring.play();
  }

  stopRing = () => {
    const { ring } = this.state;
    // remove the ring loop
    ring.removeEventListener('ended', this.loopAudio, false)
    // stop the ring loop
    ring.pause();
    ring.currentTime = 0;
  }

  loopAudio() {
    this.currentTime = 0;
    this.play();
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
