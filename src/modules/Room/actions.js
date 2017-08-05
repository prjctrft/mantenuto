import app, { socket } from 'app';
import * as constants from './constants';

const roomService = app.service('rooms');
const messageService = app.service('messages');

export function load(slug, user) {
  return {
    types: [
      constants.LOAD_ROOM,
      constants.LOAD_ROOM_SUCCESS,
      constants.LOAD_ROOM_FAIL
    ],
    promise: () => roomService.get(slug, {query: { $populate: 'listener.user talker.user' } })
  };
}

export function roomPatched(room) {
  return {
    type: constants.ROOM_PATCHED,
    room
  }
}

// export function checkin(slug, params) {
//   const query = { $populate: 'listener.user talker.user' };
//   return {
//     types: [
//       constants.CHECKIN,
//       constants.CHECKIN_SUCCESS,
//       constants.CHECKIN_FAIL
//     ],
//     promise: () => roomService.patch(slug, params, { query })
//   };
// }
//
// export function checkout(slug, params) {
//   const query = { $populate: 'listener.user talker.user' };
//   return {
//     types: [
//       constants.CHECKOUT,
//       constants.CHECKOUT_SUCCESS,
//       constants.CHECKOUT_FAIL
//     ],
//     promise: () => roomService.patch(slug, params, { query })
//   };
// }

export function isTalkerUpdate() {
  return {
    type: constants.SET_IS_TALKER
  }
}

export function isListenerUpdate() {
  return {
    type: constants.SET_IS_LISTENER,
    isListener: true
  }
}

export function peerCheckIn() {
  return {
    type: constants.PEER_CHECKED_IN,
    peerCheckedIn: true
  }
}

export function peerCheckOut() {
  return {
    type: constants.PEER_CHECKED_OUT,
    peerCheckedIn: false
  }
}

export function patchRoom(slug, params) {
  const query = { $populate: 'listener.user talker.user' };
  return {
    types: [
      constants.PATCH_ROOM,
      constants.PATCH_ROOM_SUCCESS,
      constants.PATCH_ROOM_FAIL
    ],
    promise: () => roomService.patch(slug, params, { query })
  };
}

export function pushMessage(message) {
  return {
    types: [
      constants.PUSH_MESSAGE,
      constants.PUSH_MESSAGE_SUCCESS,
      constants.PUSH_MESSAGE_FAIL
    ],
    promise: () => messageService.create(message)
  };
};

export function loadMessages(query) {
  return {
    types: [
      constants.LOAD_MESSAGES,
      constants.LOAD_MESSAGES_SUCCESS,
      constants.LOAD_MESSAGES_FAIL
    ],
    promise: () => messageService.find({ query })
  };
};

export function addMessage(message) {
  return {
    type: constants.ADD_MESSAGE,
    message
  }
}

export function setPeer(peer) {
  return {
    type: constants.SET_PEER,
    peer
  }
}

export function parsedRoom() {
  return {
    type: constants.PARSED_ROOM
  }
}

export function updateConnectionState(connectionState) {
  return {
    type: constants.UPDATE_CONNECTION_STATE,
    connectionState
  }
}

export function startCall() {
  return {
    type: constants.STARTING_CALL
  }
}

export function callAccepted() {
  return {
    type: constants.CALL_ACCEPTED
  }
}

export function clearCallState() {
  return {
    type: constants.CLEAR_CALL_STATE
  }
}

// export function parseRoom() {
//   let peer;
//   if (nextProps.isTalker) {
//     peer = room.listener.user;
//   }
//   if (nextProps.isListener) {
//     peer = room.talker.user;
//   }
//   return setPeer(peer);
// }
