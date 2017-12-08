import React, { Component } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import { makeCall,
  startUserMedia,
  stopUserMedia,
  endCall
} from 'modules/Call/redux';
import {
  patchRoom,
  updateConnectionState,
  localVideoOn,
  localVideoOff,
  // remoteVideoOn,
  // remoteVideoOff
} from '../../redux';

import ControlsComponent from './ControlsComponent';

export class ControlsControllerComponent extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      cameraOn: false,
      audioOn: false,
      controlsTouched: false
    };
    this.state = {
      ...this.defaultState
    };
    this.rtcConnection = false;
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.cleanup);
  }

  componentWillUnmount() {
    this.cleanup();
    if(this.state.cameraOn) {
      this.stopVideo();
    }
    if(this.state.audioOn) {
      this.stopAudio()
    }
    window.removeEventListener('beforeunload', this.cleanup);
  }

  cleanup = () => {
    if(this.props.callInProgress) {
      this.props.endCall(this.props.callId)
    }
  }

  startVideo = () => {
    this.props.localVideoOn();
    const cameraOn = true;
    const audioOn = this.state.audioOn;
    this.setState({ cameraOn });
    this.props.startUserMedia({ cameraOn });
  }

  touchControls = () => {
    this.setState({ controlsTouched: true });
  }

  stopVideo = () => {
    const cameraOn = false;
    this.setState({ cameraOn });
    this.props.stopUserMedia({ cameraOn });
  }

  toggleVideo = (e) => {
    e.preventDefault();
    if(!this.state.controlsTouched) {
      this.touchControls();
    }
    if(this.state.cameraOn) {
      return this.stopVideo();
    }
    this.startVideo();
  }

  startAudio = () => {
    const audioOn = true;
    const cameraOn = this.state.cameraOn;
    this.setState({ audioOn });
    this.props.startUserMedia({ audioOn, cameraOn });
  }

  stopAudio = () => {
    this.setState({ audioOn: false });
    this.props.stopUserMedia({ audioOn: false });
  }

  toggleAudio = (e) => {
    e.preventDefault();
    if(!this.state.controlsTouched) {
      this.touchControls();
    }
    if(this.state.audioOn) {
      return this.stopAudio();
    }
    this.startAudio();
  }

  makeCall = (e) => {
    const callerId = this.props.user._id;
    const receiverId = this.props.peer._id;
    this.props.makeCall({ callerId, receiverId });
  }

  stopCall = () => {
    this.setState({ ...this.defaultState });
    if (this.props.callInProgress) {
      this.props.endCall(this.props.callInProgress);
    }
    this.stopVideo();
  }

  toggleCall = () => {
    if(this.props.callInProgress) {
      return this.stopCall();
    }
    this.makeCall();
  }

  disableControlButtons = () => {
  //   // if(this.props.wasCallAccepted || this.props.wasCallStarted) {
  //   //   return false;
  //   // }
  //   // return true;
    return false;
  }

  disableCallButton = () => {
    if(this.props.makingCall || this.props.callAccepted || this.props.callInProgress) {
      return true;
    }
    return false;
  }

  render() {
    return (<ControlsComponent
      peer={this.props.peer}
      user={this.props.user}

      toggleVideo={this.toggleVideo}
      toggleAudio={this.toggleAudio}

      toggleCall={this.toggleCall}
      stopCall={this.stopCall}
      disableCallButton={this.disableCallButton}
      acceptCallOnClick={this.acceptCallOnClick}
      close={this.close}

      cameraOn={this.state.cameraOn}
      audioOn={this.state.audioOn}
      wasCallAccepted={this.props.wasCallAccepted}
    />)
  }
}

export default connect((state)=> ({
  room: state.rooms.room,
  isTalker: state.rooms.isTalker,
  isListener: state.rooms.isListener,
  user: state.user.user,
  peer: state.rooms.peer,
  peerCheckedIn: state.rooms.peerCheckedIn,
  makingCall: state.calls.makingCall,
  incomingCall: state.calls.incomingCall,
  callInProgress: state.calls.callInProgress,
  callId: state.calls.callId
}), {
  patchRoom,
  // updateConnectionState,
  makeCall,
  startUserMedia,
  stopUserMedia,
  endCall,
  // callAccepted,
  // clearCallState,
  localVideoOn,
  localVideoOff,
})(ControlsControllerComponent)
