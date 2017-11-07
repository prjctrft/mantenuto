import React, { Component } from 'react';
import app from 'app';
import { connect } from 'react-redux';

import {
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
    // use service for call data that needs to persists
    app.service('calls')
      .on('created', (Call) => {
        this.props.callIncoming();
      })
    // use socket for signalling and call data that does not need to persist
    // custom event listeners are defined on the backend so that only sockets in
    // the room and on the call can receive webRTC session descriptions, streams, etc.
    socket.on('ice candidate', (candidate) => {
      if(candidate) {
        this.localRTC.addIceCandidate(candidate).then(() => {
          console.log('ICE candidate added: ', candidate);
        }).catch(() => {
          console.log('ICE candidate failed: ', candidate);
        })
      }
    });

    socket.on('call accepted', () => {
      this.props.callAccepted();
      this.createOffer({ audioOn: true, cameraOn: true });
    });

    socket.on('receive offer', (description) => {
      this.receiveOffer(description);
    });

    socket.on('receive description', (description) => {
      const desc = new RTCSessionDescription(description);
      this.localRTC.setRemoteDescription(desc);
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.makingCall || nextProps.incomingCall && !this.state.modalOpen) {
      this.setState({ modalOpen: true });
    }
  }

  // TODO: end call
  // componentWillUnmount() {
  //   window.removeEventListener("beforeunload", this.checkout)
  //   this.checkout();
  // }

  createRTC = () => {
    this.localRTC = new RTCPeerConnection(null);

    this.localRTC.ontrack = (e) => {
      const remoteStream = e.streams[0];
      this.props.updateRemoteStream(remoteStream);
      // const videoTracks = remoteStream.getVideoTracks();
      // // debugger;
      // if(videoTracks.length > 0) {
      //   this.props.hoistRemoteStream(this.remoteStream);
      // }
    }

    this.localRTC.oniceconnectionstatechange = (e) => {
      console.log('ICE state change event: ', this.localRTC.iceConnectionState);
    }

    this.localRTC.onicecandidate = (event) => {
      socket.emit('ice candidate', event.candidate);
    }
  }

  createOffer = ({ audioOn, cameraOn }) => {
    this.createRTC();
    const offerToReceiveAudio = audioOn ? 1 : 0;
    const offerToReceiveVideo = cameraOn ? 1 : 0;
    this.props.startUserMedia({audioOn, cameraOn})
      .then(() => {
        this.props.localStream.getTracks().forEach((track) => {
          this.localRTC.addTrack(track, this.props.localStream)
        })
      })
      .then(() => {
        return this.localRTC.createOffer({
          offerToReceiveAudio,
          offerToReceiveVideo,
          voiceActivityDetection: false
        })
      })
      .then((description) => {
        return this.localRTC.setLocalDescription(description);
      })
      .then(() => {
        const description = this.localRTC.localDescription;
        socket.emit('create offer', description);
      });
  }

  receiveOffer = (description) => {
    this.createRTC();
    const desc = new RTCSessionDescription(description);
    if(!this.props.localStream) {
      this.props.startUserMedia().then(() => {
        // const stream = this.localStream;
        this.props.localStream.getTracks().forEach(track => {
          this.localRTC.addTrack(track, this.props.localStream)
        });
      })
    }
    this.localRTC.setRemoteDescription(desc).then(() => {
      return this.props.startUserMedia({});
    })
    .then(() => {
      return this.localRTC.createAnswer();
    })
    .then((description) => {
      return this.localRTC.setLocalDescription(description);
    })
    .then(() => {
      const description = this.localRTC.localDescription;
      socket.emit('send description', description);
    });
  }
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
  updateRemoteStream
})(CallController)
