import { userConstants } from '../constants';

export function loggedUser(state = {}, action) {
  switch (action.type) {
    case userConstants.GETUSER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSER_SUCCESS:
      return {
        userData: action.user
      };
    case userConstants.GETUSER_FAILURE:
      return {
        error: action.error
      };
    default:
      return state

  }
}
