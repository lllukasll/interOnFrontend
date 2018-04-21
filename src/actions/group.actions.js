import { groupConstants } from '../constants';
import { groupService } from '../services';
import { alertActions } from './';

export const groupActions = {
  getAll,
  getGroup,
  createGroup,
  joinGroup,
  leaveGroup
}

function getAll() {
  return dispatch => {
    dispatch(request());

    groupService.getAll()
      .then(
        groups => dispatch(success(groups)),
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: groupConstants.GETALL_REQUEST}}
  function success(groups) {return {type: groupConstants.GETALL_SUCCESS, groups}}
  function failure(error) {return {type: groupConstants.GETALL_FAILURE, error}}
}

function getGroup(id) {
  return dispatch => {
    dispatch(request());

    groupService.getGroup(id)
      .then(
        group => dispatch(success(group)),
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: groupConstants.GETGROUP_REQUEST}}
  function success(group) {return {type: groupConstants.GETGROUP_SUCCESS, group}}
  function failure(error) {return {type: groupConstants.GETGROUP_FAILURE, error}}
}

function createGroup(group) {
  return dispatch => {
    dispatch(request(group));

    groupService.createGroup(group)
      .then(
        group => {
          dispatch(success());
          dispatch(alertActions.success("Poprawnie dodano grupę"));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(group) {return {type: groupConstants.CREATEGROUP_REQUEST, group}}
  function success(group) {return {type: groupConstants.CREATEGROUP_SUCCESS, group}}
  function failure(error) {return {type: groupConstants.CREATEGROUP_FAILURE, error}}
}

function joinGroup(id) {
  return dispatch => {

    groupService.joinGroup(id)
      .then(
        group => {
          dispatch(success());
          dispatch(alertActions.success("Dołączono do grupy"));
        },
        error => {
          dispatch(alertActions.error(error));
        }
      );
  };

  function success() {return {type: groupConstants.JOINGROUP_SUCCESS}}
}

function leaveGroup(id) {
  return dispatch => {

    groupService.leaveGroup(id)
      .then(
        group => {
          dispatch(success());
          dispatch(alertActions.success("Opuszczono grupę"));
        },
        error => {
          dispatch(alertActions.error(error));
        }
      );
  };

  function success() {return {type: groupConstants.LEAVEGROUP_SUCCESS}}
}
