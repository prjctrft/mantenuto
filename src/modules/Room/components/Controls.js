import React, { Component } from 'react';
import { connect } from 'react-redux';
import app from 'app';
import Modal from 'react-bootstrap/lib/Modal';
import {
  patchRoom,
  updateConnectionState,
  startCall,
  callAccepted,
  clearCallState
} from '../actions';

@connect((state)=> ({
  room: state.rooms.room,
  isTalker: state.rooms.isTalker,
  isListener: state.rooms.isListener,
  user: state.user.user,
  peer: state.rooms.peer,
  signal: state.rooms.signal,
  wasCallAccepted: state.rooms.callAccepted,
  wasCallStarted: state.rooms.callStarted,
  peerCheckedIn: state.rooms.peerCheckedIn
}), {
  patchRoom,
  updateConnectionState,
  startCall,
  callAccepted,
  clearCallState
})
export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraOn: false,
      audioOn: true,
      receiveCallPrompt: false,
      remoteDescription: undefined
    }
  }

  componentDidMount() {
    require('webrtc-adapter');
    this.localRTC = new RTCPeerConnection(null);

    this.localRTC.onicecandidate = (event) => {
      socket.emit('ice candidate', event.candidate);
    }

    this.localRTC.ontrack = (e) => {
      this.remoteStream = e.streams[0];
      this.props.handleRemoteStream(this.remoteStream);
      // // if (remoteVideo.srcObject !== e.streams[0]) {
      // //   remoteVideo.srcObject = e.streams[0];
      // //   trace('pc2 received remote stream');
      // // }
      // debugger;
      // // if (vid2.srcObject !== e.streams[0]) {
      // //   vid2.srcObject = e.streams[0];
      // //   trace('Received remote stream');
      // // }
    }

    this.localRTC.oniceconnectionstatechange = (e) => {
      // onIceStateChange(pc1, e);
      console.log('ICE state change event: ', this.localRTC.iceConnectionState);
    }

    socket.on('ice candidate', (candidate) => {
      if(candidate) {
        this.localRTC.addIceCandidate(candidate).then(() => {
          console.log('ICE candidate added: ', candidate);
        }, () => {
          console.log('ICE candidate failed: ', candidate);
        })
      }
    });

    socket.on('call requested', () => {
      this.setState({ ...this.state, receiveCallPrompt: true });
      this.props.callAccepted();
    });

    socket.on('call accepted', () => {
      this.props.callAccepted();
      // if(this.localStream) {
      this.createOffer();
      // }
    });

    socket.on('receive offer', (description) => {
      this.localRTC.setRemoteDescription(description);
      this.localRTC.createAnswer().then((description) => {
        this.localRTC.setLocalDescription(description);
        socket.emit('send description', description, (foo) => {
          debugger;
        });
      });
    });

    socket.on('receive description', (description, cb) => {
      this.localRTC.setRemoteDescription(description);
      cb('foo');
    });

  }

  createOffer = () => {
    const offerToReceiveAudio = this.state.audioOn ? 1 : 0;
    const offerToReceiveVideo = this.state.cameraOn ? 1 : 0;
    if(this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.localRTC.addTrack(track, this.localStream)
      });
    }
    this.localRTC.createOffer({
      offerToReceiveAudio,
      offerToReceiveVideo,
      voiceActivityDetection: false
    }).then((description) => {
      this.localRTC.setLocalDescription(description);
      socket.emit('create offer', description);
    });
  }

  startVideo = () => {
    this.setState({ ...this.state, cameraOn: true });
    const audio = this.state.audioOn;
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio
    }).then((stream) => {
      this.props.handleLocalStream(stream);
      if(!this.localStream) {
        this.localStream = stream;
      }
      stream.getTracks().forEach((track) => {
        this.localStream.addTrack(track);
      })
      if (this.props.wasCallAccepted) {
        this.createOffer();
      }
    })
    .catch(function(e) {
      alert('getUserMedia() error: ' + e.name);
    });
  }

  stopVideo = () => {
    this.setState({ cameraOn: false });
    this.localStream.getVideoTracks()[0].stop()
  }

  toggleVideo = (e) => {
    e.preventDefault();
    if(this.state.cameraOn) {
      return this.stopVideo();
    }
    this.startVideo();
  }

  startAudio = (e) => {
    e.preventDefault();
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then((stream) => {
      if(!this.localStream) {
        this.localStream = stream;
      }
      this.localStream.addTrack(stream.getTracks()[0]);
    })
    .catch(function(e) {
      alert('getUserMedia() error: ' + e.name);
    });
  }

  stopAudio = () => {
    this.setState({ audioOn: false });
    this.localStream.getAudioTracks()[0].stop()
  }

  toggleAudio = (e) => {
    e.preventDefault();
    if(this.state.audioOn) {
      return this.stopAudio();
    }
    this.startAudio();
  }

  startCall = (e) => {
    if(this.props.peerCheckedIn) {
      this.props.startCall();
      socket.emit('request call');
    }
  }

  acceptCallOnClick = (accept) => {
    return (event) => {
      if(accept) {
        // this.receiveCall();
        socket.emit('accept call');
      }
      // return this.rejectCall();
      this.setState({ ...this.state, receiveCallPrompt: false});
    }
  };

  close = () => {
    this.stopCall();
    this.setState({ ...this.state, receiveCallPrompt: false });
  };

  // receiveCallPrompt = () => {
  //   this.setState({ ...this.state, receiveCallPrompt: true });
  // }

  // receiveCall = () => {
  //   // const description = this.state.remoteDescription;
  //   // this.localRTC.setRemoteDescription(description);
  //   this.localRTC.createAnswer().then((desc) => {
  //     // const peer = this.props.peer.user._id;
  //     // desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');
  //     // desc.type = 'pranswer';
  //     this.localRTC.setLocalDescription(desc);
  //     // this.props.updateSignalingState(this.localRTC.signalingState);
  //     // socket.emit('signal', {
  //     //   type: 'acceptCall',
  //     //   peer,
  //     //   description: desc
  //     // });
  //     this.props.callAccepted();
  //     socket.emit('accept call', desc);
  //   });
  //
  // }

  stopCall = () => {
    this.props.clearCallState();
    this.localRTC.close();
  }

  disableControlButtons = () => {
    // if(this.props.wasCallAccepted || this.props.wasCallStarted) {
    //   return false;
    // }
    // return true;
    return false;
  }

  disableCallButton = () => {
    // if(this.props.wasCallAccepted || this.props.wasCallStarted) {
    //   return true;
    // }
    return false;
  }

  render() {
    return (
      <div className={`${this.props.styles.controlBar}`}>
        <div className="btn-group btn-group-lg" role="group" aria-label="...">
          <button onClick={this.toggleVideo} type="button"
            className={
              `${this.disableControlButtons() ? 'disabled' : ''}
              btn btn-default`
              }>
            <i className="fa fa-eye" aria-hidden="true"></i>
          </button>
          {/* <button
            onClick={this.startAudio} type="button"
            className={
              `${this.props.signal !== 'stable' ? 'disabled' : ''}
              btn btn-default`
            }>
            <i className="fa fa-volume-up" aria-hidden="true"></i>
          </button> */}
          <button onClick={this.toggleAudio}
            type="button"
            className={
              `${this.disableControlButtons() ? 'disabled' : ''}
              btn btn-default`
            }>
            <i className="fa fa-microphone" aria-hidden="true"></i>
          </button>
          <button onClick={this.startCall}
            type="button"
            className={
              `${this.disableCallButton() ? 'disabled' : ''}
              btn btn-default`
            }
            >
            <i className='fa fa-phone' aria-hidden='true'></i>
          </button>
          <button onClick={this.stopCall}
            type="button"
            className={
              `${this.disableControlButtons() ? 'disabled' : ''}
              btn btn-default`
            }>
            <i className='fa fa-times' aria-hidden='true' />
          </button>
        </div>
         <Modal show={this.state.receiveCallPrompt} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Incoming Call from {this.props.peer.user.first}.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Accept Call?</h4>
            <hr />
            <p className={this.props.styles.BtnBar}>
              <button type='button' onClick={this.acceptCallOnClick(true)} className='btn btn-success'>Accept</button>
              <button type='button' onClick={this.acceptCallOnClick(false)} className='btn btn-danger'>Don't Accept</button>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-default' onClick={this.close}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
