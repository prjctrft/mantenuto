import app from 'app';

const LOAD_MESSAGES = 'messages/LOAD_MESSAGES';
const LOAD_MESSAGES_SUCCESS = 'messages/LOAD_MESSAGES_SUCCESS';
const LOAD_MESSAGES_FAIL = 'rooms/LOAD_MESSAGES_FAIL';

const PUSH_MESSAGE = 'messages/PUSH_MESSSAGE';
const PUSH_MESSAGE_SUCCESS = 'messages/PUSH_MESSAGE_SUCCESS';
const PUSH_MESSAGE_FAIL = 'messages/PUSH_MESSAGE_FAIL';
const ADD_MESSAGE = 'messages/ADD_MESSAGE';

const MARK_MESSAGES_UNREAD = 'messages/MARK_MESSAGES_UNREAD';
const MARK_MESSAGES_READ = 'messages/MARK_MESSAGES_READ';

const messageService = app.service('messages');

const initialState = {
  messages: [], // the primary message thread currently being viewed
  unreadMessages: 0 // the number of unread messages in the primary message thread
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      }
    case LOAD_MESSAGES_SUCCESS:
      const newMessages = action.result.data.reverse().concat(state.messages);
      const { skip, limit, total } = action.result;
      return {
        ...state,
        messages: newMessages,
        skip,
        total,
        limit
      }
    case MARK_MESSAGES_UNREAD:
    case MARK_MESSAGES_READ:
      const unreadMessages = action.unreadMessages;
      return {
        ...state,
        unreadMessages
      }
    case LOAD_MESSAGES:
    case PUSH_MESSAGE_FAIL:
    case PUSH_MESSAGE:
    case PUSH_MESSAGE_SUCCESS:
    default:
      return state;
  }
};

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

export function loadMessages({from, to, skip=0}) {
  return (dispatch, getState) => {
    dispatch({type: LOAD_MESSAGES});
    messageService.find({
      query: {
        $or: [
          { to, from },
          { to: from, from: to }
        ],
        $sort: { 'timestamp': -1 },
        $skip: skip
      }
    })
    .then((result) => {
      return dispatch({
        type: LOAD_MESSAGES_SUCCESS,
        result
      })
    })
    .then(() =>  {
      return dispatch(markUnreadMessages())
    })
    .catch((err) => {
      dispatch({type: LOAD_MESSAGES_FAIL, err})
    })
  }
}

export function addMessage(message) {
  return (dispatch) => {
    dispatch({
      type: ADD_MESSAGE,
      message
    })
    dispatch(markUnreadMessages())
  }
}

const markUnreadMessages = () => {
  return (dispatch, getState) => {
    const { user, messages } = getState();
    const unreadMessages = messages.messages.reduce((total, message) => {
      if(!message.read && message.to === user.user._id) {
        total +=1
        }
      return total
    }, messages.unreadMessages)
    return dispatch({type: MARK_MESSAGES_UNREAD, unreadMessages})
  }
}

export function markMessagesRead() {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.user.user._id;
    const messages = state.messages.messages;
    const messageIds = getState().messages.messages
      .filter((message) => {
        if(!message.read && message.to === userId) {
          return message
        }
      })
      .map((message) => message._id);
    if(messageIds.length > 0) {
      messageService.patch(null, {read: true}, {query: {_id: { $in: messageIds }}})
        .then((result) => {
          // obviously this should be more robust...
          // for now, next time user visits page, messages will be marked as read
          dispatch({
            type: MARK_MESSAGES_READ,
            unreadMessages: 0
          })
        })
    }
  }
}
