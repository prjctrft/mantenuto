const NOTIF_SEND = 'chat/notifs/NOTIF_SEND';
const NOTIF_DISMISS = 'chat/notifs/NOTIF_DISMISS';
const NOTIF_CLEAR = 'chat/notifs/NOTIF_CLEAR';
const NOTIF_CLEAR_ALL = 'chat/notifs/NOTIF_CLEAR_ALL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NOTIF_SEND:
      return { ...state, notifs: [action.notif, ...state.notifs || []] };
    case NOTIF_DISMISS:
      return {
        ...state,
        notifs: (state.notifs || []).filter(notif =>
          notif.id !== action.notif.id
        )
      };
    case NOTIF_CLEAR:
      return { ...state, notifs: [] };
    case NOTIF_CLEAR_ALL:
      return {};
    default:
      return state;
  }
}

export function notifSend(notif) {
  if (!notif.id) {
    notif.id = new Date().getTime() * Math.random();
  }
  return dispatch => {
    dispatch({ type: NOTIF_SEND, notif });
    setTimeout(() => dispatch({ type: NOTIF_DISMISS, notif }), notif.dismissAfter || 5000);
  };
}

export function notifDismiss(id,) {
  return { type: NOTIF_DISMISS, payload: id };
}

export function notifClear() {
  return { type: NOTIF_CLEAR };
}

export function notifClearAll() {
  return { type: NOTIF_CLEAR_ALL };
}
