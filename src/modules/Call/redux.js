import app from 'app';
import { notifSend } from 'modules/Notifs/redux';

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
// User updates session description
const UPDATE_SESSION_DESCRIPTON = 'calls/UPDATE_SESSION_DESCRIPTON';
// Peer updates session description
const SESSION_DESCRIPTION_UPDATED = 'calls/SESSION_DESCRIPTION_UPDATED';

// Media
const UPDATE_LOCAL_STREAM = 'calls/UPDATE_LOCAL_STREAM';
const UPDATE_REMOTE_STREAM = 'calls/UPDATE_REMOTE_STREAM';

const defaultState = {
  makingCall: false,
  incomingCall: false,
  callInProgress: false,
  Call: null,
  callId: null,
  localStream: null,
  remoteStream: null
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case MAKE_CALL:
      return {...state, makingCall: true, Call: action.Call, callId: action.Call._id}
    case CALL_CANCELED:
      return {...state, makingCall: false}
    case CALL_ACCEPTED:
      return {...state, makingCall: false, callInProgress: true}
    case INCOMING_CALL:
      return {...state, incomingCall: true}
    case ACCEPT_INCOMING_CALL:
      return {...state, incomingCall: false, callInProgress: true}
    case REJECT_INCOMING_CALL:
      return {...state, incomingCall: false}
    case CALL_REJECTED:
      return {...state, makingCall: false}
    case END_CALL:
    case CALL_ENDED:
      return {...state, callInProgress: false}
    case UPDATE_LOCAL_STREAM:
      return {...state, localStream: action.stream}
    case UPDATE_REMOTE_STREAM:
      return {...state, remoteStream: action.stream}
    case UPDATE_SESSION_DESCRIPTON:
    case SESSION_DESCRIPTION_UPDATED:
      return {...state, Call: action.Call}
    default:
      return state;
  }
}


export const makeCall = ({callerId, receiverId}) => {
  return ( dispatch, getState) => {
    app.service('calls').create({ caller: callerId, receiver: receiverId, status: 'calling' })
      .then((Call) => {
        dispatch({
          Call,
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

export const callIncoming = () => {
  return {
    type: INCOMING_CALL
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

export const endCall = (CallId) => {
  app.service('calls').patch(callID, { ended: new Date() })
  return {
    type: END_CALL
  }
};

export const callEnded = () => {
  return {
    type: CALL_ENDED
  }
}

export const updateSessionDescription = (CallID, sessionPatch) => {
  app.service('calls').patch(callID, sessionPatch);
  return {
    type: UPDATE_SESSION_DESCRIPTON
  }
}

export const sessionDescriptionUpdated = (Call) => {
  return {
    type: SESSION_DESCRIPTION_UPDATED,
    Call
  }
}

export const startUserMedia = ({ audioOn = true, cameraOn = true } = {}) => {
  return (dispatch) => {
    return navigator.mediaDevices.getUserMedia({
      video: cameraOn,
      audio: audioOn
    }).then((stream) => {
      debugger;
      dispatch({
        type: UPDATE_LOCAL_STREAM,
        stream
      });
      // this.props.hoistLocalStream(stream);
      // this.localStream = stream;
    })
    .catch(function(e) {
      debugger;
      alert('getUserMedia() error: ' + e.name);
    });
  }
}

export const updateRemoteStream = (stream) => {
  return {
    type: UPDATE_REMOTE_STREAM,
    stream
  }
}
