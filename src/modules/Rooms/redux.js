import app, { restApp } from 'app';

const LOAD_ROOM = 'rooms/LOAD_ROOM';
const LOAD_ROOM_SUCCESS = 'rooms/LOAD_ROOM_SUCCESS';
const LOAD_ROOM_FAIL = 'rooms/LOAD_ROOM_FAIL';

const CHECKIN = 'rooms/CHECKIN';
const CHECKIN_SUCCESS = 'rooms/CHECKIN_SUCCESS';
const CHECKIN_FAIL = 'rooms/CHECKIN_FAIL';

const CHECKOUT = 'rooms/CHECKOUT';
const CHECKOUT_SUCCESS = 'rooms/CHECKOUT_SUCCESS';
const CHECKOUT_FAIL = 'rooms/CHECKOUT_FAIL';

const SET_IS_TALKER = 'rooms/SET_IS_TALKER';
const SET_IS_LISTENER = 'rooms/SET_IS_LISTENER';

const PEER_CHECKED_IN = 'rooms/PEER_CHECKED_IN';
const PEER_CHECKED_OUT = 'rooms/PEER_CHECKED_OUT';

const ROOM_PATCHED = 'rooms/ROOM_PATCHED';

const SET_PEER = 'rooms/SET_PEER';

const PARSE_ROOM = 'rooms/PARSE_ROOM';

const CLEAR_CALL_STATE = 'rooms/CLEAR_CALL_STATE';

const UPDATE_CONTROLS = 'rooms/UPDATE_CONTROLS';

// const LOCAL_VIDEO_ON = 'rooms/LOCAL_VIDEO_ON'; // TODO - depreicate in favor of camerOn boolean
// const LOCAL_VIDEO_OFF = 'rooms/LOCAL_VIDEO_OFF';

const TOGGLE_MIC_TOOLTIP = 'rooms/TOGGLE_MIC_TOOLTIP';
const TOGGLE_CAMERA_TOOLTIP = 'rooms/TOGGLE_MIC_TOOLTIP';

const initialState = {
  micTooltip: false, // display tooltip to let user know mic is off
  cameraTooltip: false, // display tooltip to let user know camera is off
  audioOn: false, // is the mic on, managed by this state for UI purposes and passed to "Call" module
  cameraOn: false, // is the camera on, managed by this state for UI purposes and passed to "Call" module
  videoOn: false, //TODO - depricate, use camerOn instead
  loading: false, // if room is loading
  loaded: false, // if room is loaded
  userCheckingIn: false, // if user is checking in
  userCheckedIn: false, // if user is checked in
  peerCheckedIn: false, // if peer is checked in
  isTalker: false, // if user is talker
  isListener: false, // if user is listener
  room: {}, // the room object
  peer: {} // the peer object (comes from room.talker or room.listener)
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_CONTROLS: {
      const { audioOn, cameraOn } = action;
      return {
        ...state,
        audioOn,
        cameraOn
      }
    }
    case TOGGLE_MIC_TOOLTIP:
      return {
        ...state,
        micTooltip: !state.micTooltip
      }
    case TOGGLE_CAMERA_TOOLTIP:
      return {
        ...state,
        cameraTooltip: !state.cameraTooltip
      }
    case LOAD_ROOM:
      return {
        ...state,
        loading: true
      };
    case LOAD_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case LOAD_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case CHECKIN:
      return {
        ...state,
        checkingIn: true
      };
    case CHECKIN_SUCCESS:
      return {
        ...state,
        checkingIn: false,
        checkedIn: true
      };
    case CHECKIN_FAIL:
      return {
        ...state,
        checkingIn: false,
        checkedIn: false,
        error: action.error
      };
    case CHECKOUT:
      return {
        ...state,
        checkingOut: true
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        userCheckingOut: false,
        userCheckedIn: false
      };
    case CHECKOUT_FAIL:
      return {
        ...state,
        userCheckingOut: false,
        userCheckedIn: false,
        error: action.error
      };
    case PEER_CHECKED_OUT:
    case PEER_CHECKED_IN:
      return {
        ...state,
        peerCheckedIn: action.peerCheckedIn
      }
    case SET_IS_TALKER:
      return {
        ...state,
        isTalker: true,
        isListener: false
      }
    case SET_IS_LISTENER:
      return {
        ...state,
        isListener: true,
        isTalker: false
      }
    case SET_PEER:
      return {
        ...state,
        peer: action.peer,
        peerId: action.peerId
      }
    case PARSE_ROOM:
      const { room, peerCheckedIn} = action;
      return {
        ...state,
        room,
        peerCheckedIn
      }
    // case LOCAL_VIDEO_ON:
    // case LOCAL_VIDEO_OFF:
    //   return {
    //     ...state,
    //     localVideoOn: action.localVideoOn
    //   }
    case ROOM_PATCHED:
    default:
      return state;
  }
};

export const updateControls = ({audioOn, cameraOn}) => {
  return {
    type: UPDATE_CONTROLS,
    audioOn,
    cameraOn
  }
}

export const toggleMicTooltip = () => {
  return {
    type: TOGGLE_MIC_TOOLTIP
  }
}

export const loadRoom = (slug, user) => {
  return (dispatch) => {
    debugger;
    return dispatch({
      types: [
        LOAD_ROOM,
        LOAD_ROOM_SUCCESS,
        LOAD_ROOM_FAIL
      ],
      promise: () => {
        return restApp.service('rooms')
          .get(slug)
          .then((room) => dispatch(parseRoom(room)))
          .catch((err) => {
            debugger;
          })
      }
    });
  }
}

export function roomPatched(room) {
  return (dispatch) => {
    dispatch({
      type: ROOM_PATCHED,
    });
    dispatch(parseRoom(room))
  }
}

function parseRoom(room) {
  // update important state properties from room object,
  // 1) on initial load,
  // 2) when room object is updated by peer
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.auth.user;
    let peer;
    let peerCheckedIn;
    if (userId === room.talker._id) {
      dispatch(setIsTalker());
      peer = room.listener;
      if(room.listenerCheckedIn) {
        peerCheckedIn = true;
      }
    }
    if (userId === room.listener._id) {
      dispatch(setIsListener());
      if(room.talkerCheckedIn) {
        peerCheckedIn = true;
      }
      peer = room.talker;
    }
    // this.checkIn();
    dispatch(setPeer(peer));
    dispatch({type: PARSE_ROOM, room, peerCheckedIn})
  }
}

function checkIn(slug, patch) {
  return (dispatch) => {
    return dispatch({
      types: [
        CHECKIN,
        CHECKIN_SUCCESS,
        CHECKIN_FAIL
      ],
      promise: () => restApp.service('rooms').patch(slug, patch)
    });
  }
}

function checkOut(slug, patch) {
  return (dispatch) => {
    return dispatch({
      types: [
        CHECKOUT,
        CHECKOUT_SUCCESS,
        CHECKOUT_FAIL
      ],
      promise: () => restApp.service('rooms').patch(slug, patch)
    });
  };
}

export function checkInTalker(slug) {
  return (dispatch) => {
    dispatch(checkIn(slug, {talkerCheckedIn: true}))
  }
}

export function checkInListener(slug) {
  return (dispatch) => {
    dispatch(checkIn(slug, {listenerCheckedIn: true}))
  }
}


export function checkOutTalker(slug) {
  return (dispatch) => {
    return dispatch(checkOut(slug, { talkerCheckedIn: false }))
  }
}

export function checkOutListener(slug) {
  return (dispatch) => {
    return dispatch(checkOut(slug, { listenerCheckedIn: false }))
  }
}


export function setIsTalker() {
  return {
    type: SET_IS_TALKER
  }
}

export function setIsListener() {
  return {
    type: SET_IS_LISTENER
  }
}

export function setPeer(peer) {
  return {
    type: SET_PEER,
    peerId: peer._id,
    peer
  }
}

// export function localVideoOn() {
//   return {
//     type: LOCAL_VIDEO_ON,
//     localVideoOn: true
//   }
// }
//
// export function localVideoOff() {
//   return {
//     type: LOCAL_VIDEO_OFF,
//     localVideoOn: false
//   }
// }
