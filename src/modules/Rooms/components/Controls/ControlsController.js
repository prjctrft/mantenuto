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
      audioOn: true
    };
    this.state = {
      ...this.defaultState
    };
    this.rtcConnection = false;
  }

  startVideo = () => {
    this.props.localVideoOn();
    const cameraOn = true;
    const audioOn = this.state.audioOn;
    this.setState({ cameraOn });
    this.props.startUserMedia({ cameraOn });
      // .then(() => {
      //   if (this.props.wasCallAccepted) {
      //     this.createOffer({ audio: audioOn, video: cameraOn });
      //   }
      // });
  }

  stopVideo = () => {
    const cameraOn = false;
    this.setState({ cameraOn });
    this.props.stopUserMedia({ cameraOn });
  }

  toggleVideo = (e) => {
    e.preventDefault();
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
      // .then(() => {
      //   if (this.props.wasCallAccepted) {
      //     createOffer({ audio: audioOn, video: cameraOn });
      //   }
      // });
  }

  stopAudio = () => {
    this.setState({ audioOn: false });
    this.props.stopUserMedia({ audioOn: false });
  }

  toggleAudio = (e) => {
    e.preventDefault();
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

  acceptCallOnClick = (accept) => {
    return (event) => {
      if(accept) {
        socket.emit('accept call');
      }
      this.setState({ ...this.state, receiveCallPrompt: false});
    }
  };

  close = () => {
    this.stopCall();
    this.setState({ ...this.state, receiveCallPrompt: false });
  };

  stopCall = () => {
    debugger;
    this.setState({ ...this.defaultState });
    if (this.props.callInProgress) {
      this.props.endCall();
    }
    this.stopVideo();
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

      makeCall={this.makeCall}
      stopCall={this.stopCall}
      disableCallButton={this.disableCallButton}
      acceptCallOnClick={this.acceptCallOnClick}
      close={this.close}

      cameraOn={this.state.cameraOn}
      audioOn={this.state.audioOn}
      streamOpen={this.state.streamOpen}
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
  callInProgress: state.calls.callInProgress
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
