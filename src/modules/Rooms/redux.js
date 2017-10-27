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

// const PATCH_ROOM = 'rooms/PATCH_ROOM';
// const PATCH_ROOM_SUCCESS = 'rooms/PATCH_ROOM';
// const PATCH_ROOM_FAIL = 'rooms/PATCH_ROOM_FAIL';

const LOAD_MESSAGES = 'rooms/LOAD_MESSAGES';
const LOAD_MESSAGES_SUCCESS = 'rooms/LOAD_MESSAGES_SUCCESS';
const LOAD_MESSAGES_FAIL = 'rooms/LOAD_MESSAGES_FAIL';

const PUSH_MESSAGE = 'rooms/PUSH_MESSSAGE';
const PUSH_MESSAGE_SUCCESS = 'rooms/PUSH_MESSAGE_SUCCESS';
const PUSH_MESSAGE_FAIL = 'rooms/PUSH_MESSAGE_FAIL';
const ADD_MESSAGE = 'rooms/ADD_MESSAGE';

const SET_PEER = 'rooms/SET_PEER';

const PARSED_ROOM = 'rooms/PARSED_ROOM';

// const UPDATE_CONNECTION_STATE = 'rooms/UPDATE_CONNECTION_STATE';

// Local 'peer 1'
// const STARTING_CALL = 'rooms/STARTING_CALL';
// const CALL_ACCEPTED = 'rooms/CALL_ACCEPTED';

// Remote 'peer 2'
//  const RECEIVING_CALL = 'rooms/RECEIVING_CALL';

const CLEAR_CALL_STATE = 'rooms/CLEAR_CALL_STATE';

const LOCAL_VIDEO_ON = 'rooms/LOCAL_VIDEO_ON';
const LOCAL_VIDEO_OFF = 'rooms/LOCAL_VIDEO_OFF';


const initialState = {
  loaded: false,
  checkedIn: false,
  roomPatched: false,
  messages: [],
  isTalker: true,
  isListener: false,
  // startingCall: false,
  // callAccepted: false,
  room: {},
  peer: {},

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
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      }
    case LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.result.data.reverse().concat(state.messages)
      }
    // case UPDATE_CONNECTION_STATE:
    //   return {
    //     ...state,
    //     connectionState: action.connectionState
    //   }
    // case STARTING_CALL:
    //   return {
    //     ...state,
    //     callStarted: true,
    //     callAccepted: false
    //   }
    // case CALL_ACCEPTED:
    //   return {
    //     ...state,
    //     callStarted: false,
    //     callAccepted: true
    //   }
    // case CLEAR_CALL_STATE:
    //   return {
    //     ...state,
    //     callStarted: false,
    //     callAccepted: false
    //   }
    case LOCAL_VIDEO_ON:
    case LOCAL_VIDEO_OFF:
      return {
        ...state,
        localVideoOn: action.localVideoOn
      }
    case LOAD_MESSAGES:
    case PUSH_MESSAGE_FAIL:
    case PUSH_MESSAGE:
    case PUSH_MESSAGE_SUCCESS:
    default:
      return state;
  }
};

const messageService = app.service('messages');

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

// export function peerCheckIn() {
//   return {
//     type: PEER_CHECKED_IN,
//     peerCheckedIn: true
//   }
// }
//
// export function peerCheckOut() {
//   return {
//     type: PEER_CHECKED_OUT,
//     peerCheckedIn: false
//   }
// }

// export function patchRoom(slug, params) {
//   const query = { $populate: 'listener.user talker.user' };
//   return {
//     types: [
//       PATCH_ROOM,
//       PATCH_ROOM_SUCCESS,
//       PATCH_ROOM_FAIL
//     ],
//     promise: () => roomService.patch(slug, params, { query })
//   };
// }

export function pushMessage(message) {
  return {
    types: [
      PUSH_MESSAGE,
      PUSH_MESSAGE_SUCCESS,
      PUSH_MESSAGE_FAIL
    ],
    promise: () => messageService.create(message)
  };
}

export function loadMessages(query) {
  return {
    types: [
      LOAD_MESSAGES,
      LOAD_MESSAGES_SUCCESS,
      LOAD_MESSAGES_FAIL
    ],
    promise: () => messageService.find({ query })
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message
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

// export function updateConnectionState(connectionState) {
//   return {
//     type: UPDATE_CONNECTION_STATE,
//     connectionState
//   }
// }

// export function startCall() {
//   return {
//     type: STARTING_CALL
//   }
// }

// export function callAccepted() {
//   return {
//     type: CALL_ACCEPTED
//   }
// }

// export function clearCallState() {
//   return {
//     type: CLEAR_CALL_STATE
//   }
// }

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
