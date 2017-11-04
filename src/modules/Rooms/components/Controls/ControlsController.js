/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import { makeCall, startUserMedia } from 'modules/Call/redux';
import {
  patchRoom,
  updateConnectionState,
  // startCall,
  // callAccepted,
  // clearCallState,
  localVideoOn,
  localVideoOff,
  // remoteVideoOn,
  // remoteVideoOff
} from '../../redux';

import ControlsComponent from './ControlsComponent';

@connect((state)=> ({
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
  // callAccepted,
  // clearCallState,
  localVideoOn,
  localVideoOff,
})
export default class ControlsContainer extends Component {
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

  // componentDidMount() {
    // require('webrtc-adapter');

    // socket.on('ice candidate', (candidate) => {
    //   if(candidate) {
    //     this.localRTC.addIceCandidate(candidate).then(() => {
    //       console.log('ICE candidate added: ', candidate);
    //     }, () => {
    //       console.log('ICE candidate failed: ', candidate);
    //     })
    //   }
    // });
    //
    // socket.on('call requested', () => {
    //   this.setState({ ...this.state, receiveCallPrompt: true });
    //   this.props.callAccepted();
    // });
    //
    // socket.on('call accepted', () => {
    //   this.props.callAccepted();
    //   const audio = this.state.audioOn;
    //   const video = this.state.videoOn;
    //   if(this.localStream) {
    //     return this.createOffer({ audio, video });
    //   }
    //   this.startUserMedia({audioOn: audio, videoOn: video}).then(() => {
    //     return this.createOffer({ audio, video });
    //   });
    // });
    //
    // socket.on('receive offer', (description) => {
    //   if(!this.localStream) {
    //     this.startUserMedia().then(() => {
    //       // const stream = this.localStream;
    //       this.localStream.getTracks().forEach(track => {
    //         this.localRTC.addTrack(track, this.localStream)
    //       });
    //     })
    //   }
    //   this.receiveOffer(description);
    // });
    //
    // socket.on('receive description', (description) => {
    //   const desc = new RTCSessionDescription(description);
    //   this.localRTC.setRemoteDescription(desc);
    // });

  // }

  // createRTC = () => {
  //   this.localRTC = new RTCPeerConnection(null);
  //
  //   this.localRTC.ontrack = (e) => {
  //     this.remoteStream = e.streams[0];
  //     const videoTracks = this.remoteStream.getVideoTracks();
  //     // debugger;
  //     if(videoTracks.length > 0) {
  //       this.props.hoistRemoteStream(this.remoteStream);
  //     }
  //   }
  //
  //   this.localRTC.oniceconnectionstatechange = (e) => {
  //     console.log('ICE state change event: ', this.localRTC.iceConnectionState);
  //   }
  //
  //   this.localRTC.onicecandidate = (event) => {
  //     socket.emit('ice candidate', event.candidate);
  //   }
  // }

  // createOffer = ({ audio, video }) => {
  //   this.createRTC();
  //   const offerToReceiveAudio = audio ? 1 : 0;
  //   const offerToReceiveVideo = video ? 1 : 0;
  //   this.startUserMedia()
  //   .then(() => {
  //     this.localStream.getTracks().forEach((track) => {
  //       this.localRTC.addTrack(track, this.localStream)
  //     })
  //   })
  //   .then(() => {
  //     return this.localRTC.createOffer({
  //       offerToReceiveAudio,
  //       offerToReceiveVideo,
  //       voiceActivityDetection: false
  //     })
  //   })
  //   .then((description) => {
  //     return this.localRTC.setLocalDescription(description);
  //   })
  //   .then(() => {
  //     const description = this.localRTC.localDescription;
  //     socket.emit('create offer', description);
  //   });
  // }
  //
  // receiveOffer = (description) => {
  //   const desc = new RTCSessionDescription(description);
  //   this.localRTC.setRemoteDescription(desc).then(() => {
  //     return this.startUserMedia({});
  //   })
  //   .then(() => {
  //     return this.localRTC.createAnswer();
  //   })
  //   .then((description) => {
  //     return this.localRTC.setLocalDescription(description);
  //   })
  //   .then(() => {
  //     const description = this.localRTC.localDescription;
  //     socket.emit('send description', description);
  //   });
  // }

  // startUserMedia = ({ audioOn, cameraOn } = {}) => {
  //   // pass audioOn and cameraOn as arguments because state was just updated
  //   // and this.state.cameraOn and this.state.audioOn will not reflect update from
  //   // startVideo and startAudio functions
  //   const audio = audioOn || this.state.audioOn;
  //   const video = cameraOn || this.state.cameraOn;
  //   return navigator.mediaDevices.getUserMedia({
  //     video,
  //     audio
  //   }).then((stream) => {
  //     this.props.hoistLocalStream(stream);
  //     this.localStream = stream;
  //   })
  //   .catch(function(e) {
  //     alert('getUserMedia() error: ' + e.name);
  //   });
  // }

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
    this.props.localVideoOff();
    const nextState = { cameraOn: false };
    if (!this.state.audioOn) {
      nextState.streamOpen = false;
    }
    this.setState({ ...nextState });
    this.localStream.getVideoTracks()[0].stop();
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
    this.setState({ audioOn, streamOpen });
    this.props.startUserMedia({ audioOn });
      // .then(() => {
      //   if (this.props.wasCallAccepted) {
      //     createOffer({ audio: audioOn, video: cameraOn });
      //   }
      // });
  }

  stopAudio = () => {
    const nextState = { audioOn: false };
    if (!this.state.cameraOn) {
      nextState.streamOpen = false;
    }
    this.setState({ ...nextState });
    this.localStream.getAudioTracks()[0].stop()
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
    this.setState({ ...this.defaultState });
    this.props.clearCallState();
    this.localRTC.close();
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
