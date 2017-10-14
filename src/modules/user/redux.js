import { SubmissionError } from 'redux-form';
import { restApp } from 'app';

const POPULATE_USER = 'chat/user/POPULATE_USER';
const POPULATE_USER_SUCCESS = 'chat/user/POPULATE_SUCCESS';
const POPULATE_FAIL = 'chat/user/POPULATE_FAIL';
const UPDATE_USER = 'chat/user/UPDATE_USER';
const UPDATE_USER_SUCCESS = 'chat/user/UPDATE_USER_SUCCESS';
const UPDATE_USER_FAIL = 'chat/user/UPDATE_USER_FAIL';
// const POPULATE_ROOMS = 'chat/user/POPULATE_ROOMS';
// const POPULATE_ROOMS_SUCCESS = 'chat/user/POPULATE_ROOMS_SUCCESS';
const CLEAR_USER = 'chat/user/CLEAR_USER';

const catchValidation = error => {
  if (error.message) {
    if (error.message === 'Validation failed' && error.data) {
      throw new SubmissionError(error.data);
    }
    throw new SubmissionError({ _error: error.message });
  }
  return Promise.reject(error);
};

const defaultState = {
  user: {},
  userPopulated: false,
  userPopulating: false
};
// TODO: test user state shape
export function userReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case POPULATE_USER:
      return {
        ...state,
        userPopulating: true
      };
    case UPDATE_USER_SUCCESS:
    case POPULATE_USER_SUCCESS:
      return {
        ...state,
        userPopulating: false,
        userPopulated: true,
        user: action.result
      };
    // case POPULATE_ROOMS:
    //   return {
    //     ...state,
    //     populatingRooms: true
    //   };
    // case POPULATE_ROOMS_SUCCESS:
    //   return {
    //     ...state,
    //     populatingRooms: false,
    //     roomsPopulated: true,
    //     rooms: [...action.result.rooms, ...(state.rooms || [])]
    //   };
    case CLEAR_USER:
      return {};
    case POPULATE_FAIL:
    default:
      return state;
    }
  }

export function clearUser() {
  return {
    type: CLEAR_USER
  }
}

function saveUser(response) {
  return response;
}

export function populateUser(id) {
  return {
    types: [POPULATE_USER, POPULATE_USER_SUCCESS, POPULATE_FAIL],
    promise: () => restApp.service('users').get(id)
      .then(saveUser)
      .catch(catchValidation)
  }
}

export function updateUser(id, data) {
  return {
    types: [UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL],
    promise: () => restApp.service('users').patch(id, data)
      .then(saveUser)
      .catch(catchValidation)
  }
}

export function checkUsername(username) {
  return restApp.service('users/check-username').create({ username });
}

// function saveRooms(response) {
//   return { rooms: response.data };
// }

// export function populateRooms(id, roomType) {
//   const query = {
//     $or: [
//       { 'talker.user': id },
//       { 'listener.user': id }
//     ],
//     $select: [
//       'slug',
//       'talker',
//       'listener'
//     ],
//     $populate: [
//       'talker.user',
//       'listener.user'
//     ]
//   };
//   // e.g. 'talker.user' or 'listener.user'
//   // query[`${roomType}.user`] = id;
//   return {
//     types: [POPULATE_ROOMS, POPULATE_ROOMS_SUCCESS, POPULATE_FAIL],
//     promise: () => app.service('rooms').find({query})
//       .then(saveRooms)
//       .catch(catchValidation)
//   }
// }
