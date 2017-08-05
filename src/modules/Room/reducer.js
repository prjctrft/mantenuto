import * as constants from './constants';

const initialState = {
  loaded: false,
  checkedIn: false,
  roomPatched: false,
  messages: [],
  startingCall: false,
  callAccepted: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.LOAD_ROOM:
      return {
        ...state,
        loading: true
      };
    case constants.LOAD_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        room: action.result
      };
    case constants.LOAD_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    // case constants.CHECKIN:
    //   return {
    //     ...state,
    //     checkingIn: true
    //   };
    // case constants.CHECKIN_SUCCESS:
      // return {
      //   ...state,
      //   checkingIn: false,
      //   checkedIn: true,
      //   room: action.result,
      // };
    // case constants.CHECKIN_FAIL:
    //   return {
    //     ...state,
    //     checkingIn: false,
    //     checkedIn: false,
    //     error: action.error
    //   };
    case constants.PEER_CHECKED_OUT:
    case constants.PEER_CHECKED_IN:
      return {
        ...state,
        peerCheckedIn: action.peerCheckedIn
      }
    case constants.ROOM_PATCHED:
      return {
        ...state,
        room: action.room,
        roomPatched: true
      }
    case constants.SET_IS_TALKER:
      return {
        ...state,
        isTalker: true,
        isListener: false
      }
    case constants.SET_IS_LISTENER:
      return {
        ...state,
        isListener: true,
        isTalker: false
      }
    case constants.SET_IS_LISTENER:
      return {
        ...state,
        isListener: true,
        isTalker: false
      }
    case constants.SET_PEER:
      return {
        ...state,
        peer: action.peer
      }
    case constants.PARSED_ROOM:
      return {
        ...state,
        isRoomParsed: true
      }
    case constants.ADD_MESSAGE:
      const nextMessages = state.messages.concat(action.message);
      return {
        ...state,
        messages: nextMessages
      }
    case constants.LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.result.data.reverse().concat(state.messages)
      }
    case constants.UPDATE_CONNECTION_STATE:
      return {
        ...state,
        connectionState: action.connectionState
      }
    case constants.STARTING_CALL:
      return {
        ...state,
        callStarted: true,
        callAccepted: false
      }
    case constants.CALL_ACCEPTED:
      return {
        ...state,
        callStarted: false,
        callAccepted: true
      }
    case constants.CLEAR_CALL_STATE:
      return {
        ...state,
        callStarted: false,
        callAccepted: false
      }
    case constants.LOAD_MESSAGES:
    case constants.PUSH_MESSAGE_FAIL:
    case constants.PUSH_MESSAGE:
    case constants.PUSH_MESSAGE_SUCCESS:
    default:
      return state;
  }
};
