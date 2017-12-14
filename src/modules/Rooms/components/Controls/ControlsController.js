import React, { Component } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import { makeCall,
  updateUserMedia,
  endCall
} from 'modules/Call/redux';
import {
  patchRoom,
  updateConnectionState,
  updateControls,
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
      // cameraOn: false,
      // audioOn: false,
      controlsTouched: false
    };
    this.state = {
      ...this.defaultState
    };
  }

  componentWillUnmount() {
    this.cleanup();
    if(this.props.cameraOn) {
      this.stopVideo();
    }
    if(this.props.audioOn) {
      this.stopAudio()
    }
  }

  cleanup = () => {
    if(this.props.callInProgress) {
      this.props.endCall(this.props.callId)
    }
  }

  startVideo = () => {
    const newState = {cameraOn: true};
    if(!this.state.controlsTouched) {
      this.touchControls();
      // turn audioOn when video is turned on for the first time
      newState.audioOn = true;
    } else {
      newState.audioOn = this.props.audioOn;
    }
    this.props.localVideoOn();
    this.props.updateControls({... newState});
    this.props.updateUserMedia({ ...newState });
  }

  touchControls = () => {
    this.setState({ controlsTouched: true });
  }

  stopVideo = () => {
    const cameraOn = false;
    this.props.updateControls({ cameraOn });
    const audioOn = this.props.audioOn;
    this.props.updateUserMedia({ cameraOn, audioOn });
  }

  toggleVideo = (e) => {
    e.preventDefault();
    if(this.props.cameraOn) {
      return this.stopVideo();
    }
    this.startVideo();
  }

  startAudio = () => {
    const audioOn = true;
    this.props.updateControls({ audioOn });
    const cameraOn = this.props.cameraOn;
    this.props.updateUserMedia({ audioOn, cameraOn });
  }

  stopAudio = () => {
    const audioOn = false;
    this.props.updateControls({ audioOn });
    const cameraOn = this.props.cameraOn;
    this.props.updateUserMedia({ audioOn, cameraOn });
  }

  toggleAudio = (e) => {
    e.preventDefault();
    if(!this.state.controlsTouched) {
      this.touchControls();
    }
    if(this.props.audioOn) {
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
      this.props.endCall();
    }
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

      wasCallAccepted={this.props.wasCallAccepted}
    />)
  }
}

const mapStateToProps = (state)=> {
  const { audioOn, cameraOn, peer, room, isTalker, isListener, peerCheckedIn } = state.rooms;
  return {
    room,
    audioOn,
    cameraOn,
    isTalker,
    isListener,
    peer,
    peerCheckedIn,
    user: state.user.user,
    makingCall: state.calls.makingCall,
    incomingCall: state.calls.incomingCall,
    callInProgress: state.calls.callInProgress,
    callId: state.calls.callId
  }
}

export default connect(mapStateToProps, {
  patchRoom,
  // updateConnectionState,
  makeCall,
  updateUserMedia,
  endCall,
  // callAccepted,
  // clearCallState,
  localVideoOn, // -- TODO: depricate in favor of cameraOn boolean
  localVideoOff,// -- TODO: depricate in favor of cameraOn boolean
  updateControls
})(ControlsControllerComponent)
