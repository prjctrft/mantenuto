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

const PARSED_ROOM = 'rooms/PARSED_ROOM';

const CLEAR_CALL_STATE = 'rooms/CLEAR_CALL_STATE';

const LOCAL_VIDEO_ON = 'rooms/LOCAL_VIDEO_ON';
const LOCAL_VIDEO_OFF = 'rooms/LOCAL_VIDEO_OFF';


const initialState = {
  loaded: false,
  checkedIn: false,
  roomPatched: false,
  isTalker: true,
  isListener: false,
  room: {},
  peer: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ROOM:
      return {
        ...state,
        loading: true
      };
    case LOAD_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        room: action.result
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
        checkedIn: true,
        room: action.result,
      };
    case CHECKIN_FAIL:
      return {
        ...state,
        checkingIn: false,
        checkedIn: false,
        error: action.error
      };
    case PEER_CHECKED_OUT:
    case PEER_CHECKED_IN:
      return {
        ...state,
        peerCheckedIn: action.peerCheckedIn
      }
    case ROOM_PATCHED:
      return {
        ...state,
        room: action.room,
        roomPatched: true
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
    case PARSED_ROOM:
      return {
        ...state,
        isRoomParsed: true
      }
    case LOCAL_VIDEO_ON:
    case LOCAL_VIDEO_OFF:
      return {
        ...state,
        localVideoOn: action.localVideoOn
      }
    default:
      return state;
  }
};

export const loadRoom = (slug, user) => {
  return {
      types: [
        LOAD_ROOM,
        LOAD_ROOM_SUCCESS,
        LOAD_ROOM_FAIL
      ],
      promise: () => {
        return restApp.service('rooms')
          .get(slug)
      }
    };
}

export function roomPatched(room) {
  return {
    type: ROOM_PATCHED,
    room
  }
}

function checkIn(slug, patch) {
  return {
    types: [
      CHECKIN,
      CHECKIN_SUCCESS,
      CHECKIN_FAIL
    ],
    promise: () => restApp.service('rooms').patch(slug, patch)
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


function checkout(slug, patch) {
  return {
    types: [
      CHECKOUT,
      CHECKOUT_SUCCESS,
      CHECKOUT_FAIL
    ],
    promise: () => roomService.patch(slug, patch)
  };
}

export function checkOutTalker(slug) {
  return (dispatch) => {
    dispatch(checkOut(slug, { talkerCheckedIn: false }))
  }
}

export function checkOutListener(slug) {
  return (dispatch) => {
    dispatch(checkOut(slug, { listenerCheckedIn: false }))
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

export function parsedRoom() {
  return {
    type: PARSED_ROOM
  }
}

export function localVideoOn() {
  return {
    type: LOCAL_VIDEO_ON,
    localVideoOn: true
  }
}

export function localVideoOff() {
  return {
    type: LOCAL_VIDEO_OFF,
    localVideoOn: false
  }
}
