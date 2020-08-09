import { ACTIONS } from './actions'

const INITIAL_STATE = { currentUser: null };

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      return { ...state, currentUser: action.data };
    case ACTIONS.SIGN_OUT:
      return {};
    case ACTIONS.SELECT_MEMBER:
      return { ...state, selectedMember: action.data };
    default:
      return state;
  }
}
