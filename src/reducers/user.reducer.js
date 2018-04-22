import { userConstants } from '../constants';

export function loggedUser(state = {}, action) {
  switch (action.type) {
    case userConstants.GETLOGGEDUSER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETLOGGEDUSER_SUCCESS:
      return {
        loggedUserData: action.user
      };
    case userConstants.GETLOGGEDUSER_FAILURE:
      return {
        error: action.error
      };
    default:
      return state

  }
}

export function user(state = {}, action) {
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

export function changePassword(state = {}, action) {
  switch (action.type) {
    case userConstants.CHANGEPASSWORD_REQUEST:
      return {
        loadingChangePassword: true
      };
    case userConstants.CHANGEPASSWORD_SUCCESS:
      return {
        
      };
    case userConstants.CHANGEPASSWORD_FAILURE:
      return {
        error: action.error
      };
    default:
      return state

  }
}
