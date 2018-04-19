import { groupConstants } from '../constants';
import { groupService } from '../services';

export const groupActions = {
  getAll,
  getGroup
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
