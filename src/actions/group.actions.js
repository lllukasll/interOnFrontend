import { groupConstants } from '../constants';
import { groupService } from '../services';
import { alertActions } from './';

export const groupActions = {
  getAll,
  getGroup,
  createGroup,
  updateGroup,
  uploadPhoto,
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
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(request());
      groupService.getGroup(id)
        .then(
          group => {
            dispatch(success(group));
            resolve(group);
          },
          error => {
            dispatch(failure(error));
            reject(error);
          }
        );
    });
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
          dispatch(success(group));
          dispatch(alertActions.success("Poprawnie dodano grupę"));
        },
        error => {
          dispatch(failure(error));
          //dispatch(alertActions.error(error));
        }
      );
  };

  function request(group) {return {type: groupConstants.CREATEGROUP_REQUEST, group}}
  function success(group) {return {type: groupConstants.CREATEGROUP_SUCCESS, group}}
  function failure(error) {return {type: groupConstants.CREATEGROUP_FAILURE, error}}
}

function updateGroup(group, id) {
  return dispatch => {
    dispatch(request(group));

    groupService.updateGroup(group, id)
      .then(
        group => {
          dispatch(success(group));
          dispatch(alertActions.success("Poprawnie zaktualizowano dane grupy"));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request(group) {return {type: groupConstants.CREATEGROUP_REQUEST, group}}
  function success(group) {return {type: groupConstants.CREATEGROUP_SUCCESS, group}}
  function failure(error) {return {type: groupConstants.CREATEGROUP_FAILURE, error}}
}

function uploadPhoto(photo, id) {
  return dispatch => {
    dispatch(request(photo));

    groupService.uploadPhoto(photo, id)
      .then(
        photo => {
          dispatch(success(photo));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(photo) {return {type: groupConstants.UPLOADPHOTO_REQUEST, photo}}
  function success(photo) {return {type: groupConstants.UPLOADPHOTO_SUCCESS, photo}}
  function failure(error) {return {type: groupConstants.UPLOADPHOTO_FAILURE, error}}
}

function joinGroup(id) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      groupService.joinGroup(id)
        .then(
          group => {
            dispatch(success());
            resolve();
            dispatch(alertActions.success("Dołączono do grupy"));
          },
          error => {
            dispatch(alertActions.error(error));
            reject(error);
          }
        );
    });
  };

  function success() {return {type: groupConstants.JOINGROUP_SUCCESS}}
}

function leaveGroup(id) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    groupService.leaveGroup(id)
      .then(
        group => {
          dispatch(success());
          resolve();
          dispatch(alertActions.success("Opuszczono grupę"));
        },
        error => {
          dispatch(alertActions.error(error));
          reject(error);
        }
        );
    });
  };

  function success() {return {type: groupConstants.LEAVEGROUP_SUCCESS}}
}
