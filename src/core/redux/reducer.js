import { ACTIONS } from './actions'

/**
 * Initial redux store state to start app with...
 */
const INITIAL_STATE = { currentUser: null };

/**
 * Computes the new store state after every action dispatch...
 * @param {*} state intial state of store
 * @param {*} action dispatched action
 */
export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.SIGN_OUT:
      return {};
    case ACTIONS.SIGN_IN:
      return { ...state, currentUser: action.data };
    case ACTIONS.SELECT_MEMBER:
      return { ...state, selectedMember: action.data };
    default:
      return state;
  }
}
