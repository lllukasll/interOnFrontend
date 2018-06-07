import { friendConstants } from '../constants';
import { friendService } from '../services';
import { alertActions } from './';

export const friendActions = {
  getInvitations,
  getConfirmed,
  addFriend,
  confirmFriend,
  deleteFriend,
  clearInvitations
}

function getInvitations() {
  return dispatch => {
    dispatch(request());

    friendService.getInvitations()
      .then(
        invitations => dispatch(success(invitations)),
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: friendConstants.GETINVITATIONS_REQUEST}}
  function success(invitations) {return {type: friendConstants.GETINVITATIONS_SUCCESS, invitations}}
  function failure(error) {return {type: friendConstants.GETINVITATIONS_FAILURE, error}}
}

function getConfirmed() {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(request());
      friendService.getConfirmed()
        .then(
          confirmedFriends => {
            dispatch(success(confirmedFriends));
            resolve(confirmedFriends);
          },
          error => {
            dispatch(failure(error));
            reject(error);
          }
        );
    });
  };

  function request() {return {type: friendConstants.GETCONFIRMED_REQUEST}}
  function success(confirmedFriends) {return {type: friendConstants.GETCONFIRMED_SUCCESS, confirmedFriends}}
  function failure(error) {return {type: friendConstants.GETCONFIRMED_FAILURE, error}}
}

function addFriend(userid) {
  return dispatch => {
    dispatch(request());

    friendService.addFriend(userid)
      .then(
        friend => {
          dispatch(success(friend));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: friendConstants.ADDFRIEND_REQUEST}}
  function success(friend) {return {type: friendConstants.ADDFRIEND_SUCCESS, friend}}
  function failure(error) {return {type: friendConstants.ADDFRIEND_FAILURE, error}}
}

function confirmFriend(userid) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    friendService.confirmFriend(userid)
      .then(
        friend => {
          dispatch(success(friend));
          resolve(friend);
        },
        error => {
          dispatch(failure(error));
          reject(error);
        }
        );
    });
  };

  function request() {return {type: friendConstants.CONFIRMFRIEND_REQUEST}}
  function success(friend) {return {type: friendConstants.CONFIRMFRIEND_SUCCESS, friend}}
  function failure(error) {return {type: friendConstants.CONFIRMFRIEND_FAILURE, error}}
}

function deleteFriend(userid) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request());

    friendService.deleteFriend(userid)
      .then(
        friend => {
          dispatch(success(friend));
          resolve(friend);
        },
        error => {
          dispatch(failure(error));
          reject(error);
        }
        );
    });
  };

  function request() {return {type: friendConstants.DELETEFRIEND_REQUEST}}
  function success(friend) {return {type: friendConstants.DELETEFRIEND_SUCCESS, friend}}
  function failure(error) {return {type: friendConstants.DELETEFRIEND_FAILURE, error}}
}

function clearInvitations() {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
        dispatch(request());
    });
  };

  function request() {return {type: friendConstants.CLEAR_INVITATIONS}}
}