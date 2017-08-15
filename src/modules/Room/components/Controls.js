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

import ControlButton from './ControlButton';

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
    this.defaultState = {
      cameraOn: false,
      audioOn: true,
      receiveCallPrompt: false,
      remoteDescription: undefined,
      streamOpen: false
    };
    this.state = {
      ...this.defaultState
    };
    this.rtcConnection = false;
  }

  componentDidMount() {
    require('webrtc-adapter');
    this.localRTC = new RTCPeerConnection(null);

    this.localRTC.onicecandidate = (event) => {
      socket.emit('ice candidate', event.candidate);
    }

    this.localRTC.ontrack = (e) => {
      this.remoteStream = e.streams[0];
      const videoTracks = this.remoteStream.getVideoTracks();
      debugger;
      if(videoTracks.length > 0) {
        this.props.handleRemoteStream(this.remoteStream);
      }
    }

    this.localRTC.oniceconnectionstatechange = (e) => {
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
      const audio = this.state.audioOn;
      const video = this.state.videoOn;
      if(this.localStream) {
        return this.createOffer({ audio, video });
      }
      this.startUserMedia({audioOn: audio, videoOn: video}).then(() => {
        return this.createOffer({ audio, video });
      });
    });

    socket.on('receive offer', (description) => {
      if(!this.localStream) {
        this.startUserMedia().then(() => {
          // const stream = this.localStream;
          this.localStream.getTracks().forEach(track => {
            this.localRTC.addTrack(track, this.localStream)
          });
        })
      }
      this.receiveOffer(description);
    });

    socket.on('receive description', (description) => {
      const desc = new RTCSessionDescription(description);
      this.localRTC.setRemoteDescription(desc);
    });

  }

  createOffer = ({ audio, video }) => {
    const offerToReceiveAudio = audio ? 1 : 0;
    const offerToReceiveVideo = video ? 1 : 0;
    // const offerToReceiveAudio = 1;
    // const offerToReceiveVideo = 1;
    this.startUserMedia()
    .then(() => {
      this.localStream.getTracks().forEach((track) => {
        this.localRTC.addTrack(track, this.localStream)
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
    const desc = new RTCSessionDescription(description);
    this.localRTC.setRemoteDescription(desc).then(() => {
      return this.startUserMedia({});
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

  startUserMedia = ({ audioOn, cameraOn } = {}) => {
    // pass audioOn and cameraOn as arguments because state was just updated
    // and this.state.cameraOn and this.state.audioOn will not reflect update from
    // startVideo and startAudio functions
    const audio = audioOn || this.state.audioOn;
    const video = cameraOn || this.state.cameraOn;
    return navigator.mediaDevices.getUserMedia({
      video,
      audio
    }).then((stream) => {
      this.props.handleLocalStream(stream);
      this.localStream = stream;
    })
    .catch(function(e) {
      alert('getUserMedia() error: ' + e.name);
    });
  }

  startVideo = () => {
    const cameraOn = true;
    const audioOn = this.state.audioOn;
    const streamOpen = true;
    this.setState({ cameraOn, streamOpen });
    this.startUserMedia({ cameraOn })
      .then(() => {
        if (this.props.wasCallAccepted) {
          this.createOffer({ audio: audioOn, video: cameraOn });
        }
      });
  }

  stopVideo = () => {
    const nextState = { cameraOn: false };
    if (!this.state.audioOn) {
      nextState.streamOpen = false;
    }
    this.setState({ ...nextState });
    this.localStream.getVideoTracks()[0].stop()
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
    const streamOpen = true;
    const cameraOn = this.state.cameraOn;
    this.setState({ audioOn, streamOpen });
    this.startUserMedia({ audioOn })
      .then(() => {
        if (this.props.wasCallAccepted) {
          createOffer({ audio: audioOn, video: cameraOn });
        }
      });;
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

  startCall = (e) => {
    if(this.props.peerCheckedIn) {
      this.props.startCall();
      socket.emit('request call');
    }
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
    // if(this.props.wasCallAccepted || this.props.wasCallStarted) {
    //   return true;
    // }
    return false;
  }

  render() {
    return (
      <div className={`${this.props.styles.controlBar}`}>
        <div className="btn-group btn-group-lg" role="group" aria-label="...">
          <ControlButton
            onClick={this.toggleVideo}
            streamOpen={this.state.streamOpen}
            controlOn={this.state.cameraOn}
            faClass={'fa fa-eye'}
          />
          <ControlButton
            onClick={this.toggleAudio}
            streamOpen={this.state.streamOpen}
            controlOn={this.state.audioOn}
            faClass={'fa fa-microphone'}
          />
          <ControlButton
            onClick={this.startCall}
            streamOpen={this.state.streamOpen}
            controlOn={this.state.callAccepted}
            faClass={'fa fa-phone'}
          />
          {/* <button onClick={this.startCall}
            type="button"
            className={
              `${this.disableCallButton() ? 'disabled' : ''}
              btn btn-default`
            }
            >
            <i className='fa fa-phone' aria-hidden='true'></i>
          </button> */}
          <ControlButton
            onClick={this.stopCall}
            streamOpen={this.state.callAccepted}
            controlOn={!this.state.callAccepted}
            faClass={'fa fa-times'}
          />
          {/* <button onClick={this.stopCall}
            type="button"
            className={
              `${this.disableControlButtons() ? 'disabled' : ''}
              btn btn-default`
            }>
            <i className='fa fa-times' aria-hidden='true' />
          </button> */}
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
