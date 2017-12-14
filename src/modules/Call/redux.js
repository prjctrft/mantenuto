import app from 'app';
import { notifSend } from 'modules/Notifs/redux';

// create RTC Client
const CREATE_PC = 'calls/CREATE_PC';
// User initiates call
const MAKE_CALL = 'calls/MAKE_CALL';
// User cancels call
const CALL_CANCELED = 'calls/CALL_CANCELED';
// Peer accepts call
const CALL_ACCEPTED = 'calls/CALL_ACCEPTED';
// Peer initiates call
const INCOMING_CALL = 'calls/START_CALL';
// User accepts call
const ACCEPT_INCOMING_CALL = 'calls/ACCEPT_INCOMING_CALL';
// User rejects call
const REJECT_INCOMING_CALL = 'calls/REJECT_INCOMING_CALL';
// Peer rejects call
const CALL_REJECTED = 'calls/CALL_REJECTED';
// User ends call
const END_CALL = 'calls/END_CALL';
// Peer ends call
const CALL_ENDED = 'calls/CALL_ENDED';

// Media
const UPDATE_LOCAL_STREAM = 'calls/UPDATE_LOCAL_STREAM';
const UPDATE_REMOTE_STREAM = 'calls/UPDATE_REMOTE_STREAM';

// hoist peer connection for use in this context
let pc;

const defaultState = {
  makingCall: false,
  incomingCall: false,
  callInProgress: false,
  _Call: null,
  callId: null,
  localStream: null,
  remoteStream: null,
  remoteVideo: false, // is remote video on
  remoteAudio: false, // is remote audio on
  pc: null
};

export default (state = defaultState, action = {}) => {
  const {_Call, callId} = action;
  switch (action.type) {
    case MAKE_CALL:
      return {...state, makingCall: true, _Call, callId }
    case CALL_CANCELED:
      return {...state, makingCall: false}
    case CALL_ACCEPTED:
      return {...state, makingCall: false, callInProgress: true}
    case INCOMING_CALL:
      return {...state, incomingCall: true, _Call, callId}
    case ACCEPT_INCOMING_CALL:
      return {...state, incomingCall: false, callInProgress: true}
    case REJECT_INCOMING_CALL:
      return {...state, incomingCall: false}
    case CALL_REJECTED:
      return {...state, makingCall: false}
    case END_CALL:
    case CALL_ENDED:
      return {
        ...state,
        callInProgress: false
      }
    case UPDATE_LOCAL_STREAM:
      return {...state, localStream: action.stream}
    case UPDATE_REMOTE_STREAM:
      const { remoteAudio, remoteVideo, stream } = action;
      debugger;
      return {
        ...state,
        remoteStream: stream,
        remoteAudio,
        remoteVideo

      }
    case CREATE_PC:
      return {...state, pc: action.pc}
    default:
      return state;
  }
}

export const createRTC = () => {
  return (dispatch) => {
    pc = new RTCPeerConnection({
      iceServers: [{
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302'
        ]
      }]
    });
    pc.ontrack = (e) => {
      const remoteStream = e.streams[0];
      dispatch(updateRemoteStream(remoteStream));
    }

    // pc.onremovestream

    pc.oniceconnectionstatechange = (e) => {
      console.log('ICE state change event: ', pc.iceConnectionState);
    }

    pc.onicecandidate = (event) => {
      socket.emit('ice candidate', event.candidate);
    }

    pc.onnegotiationneeded = (event) => {
      return
    }

    // use socket for signalling and call data that does not need to persist
    // custom event listeners are defined on the backend so that only sockets in
    // the room and on the call can receive webRTC session descriptions, streams, etc.
    socket.on('ice candidate', (candidate) => {
      if(candidate) {
        pc.addIceCandidate(candidate).then(() => {
          console.log('ICE candidate added: ', candidate);
        }).catch(() => {
          console.log('ICE candidate failed: ', candidate);
        })
      }
    });

    socket.on('call accepted', () => {
      dispatch(callAccepted());
      dispatch(createOffer());
    });

    socket.on('receive offer', (peerDescription) => {
      dispatch(receiveOffer(peerDescription))
      .then((localDescription) => socket.emit('send description', localDescription));
    });

    socket.on('receive description', (description) => {
      const desc = new RTCSessionDescription(description);
      pc.setRemoteDescription(desc);
    });

    socket.on('call ended', () => {
      dispatch(callEnded())
    });

    return dispatch({pc, type: CREATE_PC})

  }
}

export const makeCall = ({callerId, receiverId}) => {
  return ( dispatch, getState) => {
    app.service('calls').create({ caller: callerId, receiver: receiverId, status: 'calling' })
      .then((_Call) => {
        dispatch({
          _Call,
          callId: _Call._id,
          type: MAKE_CALL
        })
      })
      .catch((err) => {
        dispatch(notifSend({
          kind: 'danger',
          message: 'The person you are trying to call is not logged in!'
        }))
      })
    }
};

export const cancelCall = (callId) => {
  return (dispatch) => app.service('calls')
    .patch(callId, { status: 'canceled' })
    .then(() => {
      dispatch({
        type: CALL_CANCELED
      });
    });
};

export const callAccepted = () => {
  return {
    type: CALL_ACCEPTED
  }
};

export const callIncoming = (_Call) => {
  return {
    type: INCOMING_CALL,
    _Call,
    callId: _Call._id
  }
};

export const acceptCall = (callId) => {
  app.service('calls').patch(callId, {started: new Date(), status: 'started' });
  return {
    type: ACCEPT_INCOMING_CALL
  }
};

export const rejectCall = (callId) => {
  app.service('calls').patch(callId, {status: 'rejected' });
  return {
    type: REJECT_INCOMING_CALL
  }
};

export const endCall = () => {
  return (dispatch, getState) => {
    const state = getState().calls;
    const callId = state.callId;
    app.service('calls')
      .patch(callId, { ended: new Date() })
      .then(() => {
        dispatch({
          type: END_CALL
        })
        // remove remote stream and reset remotes to defaults
        dispatch({
          type: UPDATE_REMOTE_STREAM,
          remoteStream: null,
          remoteVideo: false,
          remoteAudio: false
        })
        socket.emit('end call', {});
        pc.close();
      })
    }
};

export const callEnded = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_REMOTE_STREAM,
      remoteStream: null,
      remoteVideo: false,
      remoteAudio: false
    });
    dispatch({type: CALL_ENDED})
  }
}

export const updateUserMedia = ({ audioOn, cameraOn} = {}) => {
  return (dispatch, getState) => {
    const state = getState().calls;
    const {pc, localStream} = state;
    // if there is already a stream,
    if(pc.getSenders().length > 0) {
    // remove audio or video
      stopLocalStream({localStream});
    }
    // if user turns of mic and camera getUserMedia will error
    if(!audioOn && !cameraOn) {
      return Proimse.resolve();
    }
    return navigator.mediaDevices.getUserMedia({
      video: cameraOn,
      audio: audioOn
    }).then((stream) => {
      dispatch({
        type: UPDATE_LOCAL_STREAM,
        stream
      });
      // add track to peer connection
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
      // if their is a call in progress
      // renegotiate offer with new stream
      if(state.callInProgress) {
        return dispatch(createOffer())
      }
    })
    .catch(function(e) {
      alert('getUserMedia() error: ' + e.name);
    });
  }
}

export const stopLocalStream = ({localStream}) => {
  localStream.getTracks().forEach((track) => {
    track.stop();
  });
  // remove all audio and video tracks from peer connection
  pc.getSenders().forEach((sender) => {
    pc.removeTrack(sender);
  })
};

export const updateRemoteStream = (stream) => {
  debugger;
  let remoteAudio = false;
  let remoteVideo = false;
  if(stream.getAudioTracks().length > 0) {
    remoteAudio = true;
  }
  if(stream.getVideoTracks().length > 0) {
    remoteVideo = true;
  }
  return {
    type: UPDATE_REMOTE_STREAM,
    stream,
    remoteVideo,
    remoteAudio
  }
}

export const createOffer = () => {
  return (dispatch) => {
    const offerToReceiveAudio = 1;
    const offerToReceiveVideo = 1;

    if(pc.getLocalStreams().length === 0) {
      console.log('prompt audio/video on');
      // this.props.localStream.getTracks().forEach((track) => {
      //   this.props.pc.addTrack(track, this.props.localStream)
      // })
    }
    pc.createOffer({
      offerToReceiveAudio,
      offerToReceiveVideo,
      voiceActivityDetection: false
    })
    .then((description) => {
      return pc.setLocalDescription(description);
    })
    .then(() => {
      const description = pc.localDescription;
      socket.emit('create offer', description);
    });
  }
}

export const receiveOffer = (remoteDescription) => {
  return (dispatch, getState) => {
    const pc = getState().calls.pc
    const remoteDesc = new RTCSessionDescription(remoteDescription);
    if(pc.getLocalStreams().length === 0) {
      console.log('prompt audio/video on');
      // return this.props.updateUserMedia({audioOn, cameraOn})
      // this.props.localStream.getTracks().forEach((track) => {
      //   this.props.pc.addTrack(track, this.props.localStream)
      // })
    }
    return pc.setRemoteDescription(remoteDesc)
    .then(() => {
      return pc.createAnswer();
    })
    .then((description) => {
      return pc.setLocalDescription(description);
    })
    .then(() => {
      return pc.localDescription;
    });
  }
}
