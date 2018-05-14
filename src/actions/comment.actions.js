import { commentConstants } from '../constants';
import { commentService } from '../services';

export const commentActions = {
    addPostComment,
    updatePostComment,
    //getPostComments,
    clear
}

function addPostComment(comment, groupId, postId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request(comment));

    commentService.addPostComment(comment, groupId, postId)
      .then(
        comment => {
          dispatch(success(comment));
          resolve(comment);
        },
        error => {
          dispatch(failure(error));
          reject(error);
        }
        );
    });
  };

  function request(comment) {return {type: commentConstants.CREATEPOSTCOMMENT_REQUEST, comment}}
  function success(comment) {return {type: commentConstants.CREATEPOSTCOMMENT_SUCCESS, comment}}
  function failure(error) {return {type: commentConstants.CREATEPOSTCOMMENT_FAILURE, error}}
}

function updatePostComment(comment, groupId, postId, commentId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request(comment));

    commentService.updatePostComment(comment, groupId, postId,commentId)
      .then(
        comment => {
          dispatch(success(comment));
          resolve(comment);
        },
        error => {
          dispatch(failure(error));
          reject(error);
        }
        );
    });
  };

  function request(comment) {return {type: commentConstants.UPDATEPOSTCOMMENT_REQUEST, comment}}
  function success(comment) {return {type: commentConstants.UPDATEPOSTCOMMENT_SUCCESS, comment}}
  function failure(error) {return {type: commentConstants.UPDATEPOSTCOMMENT_FAILURE, error}}
}

export function getPostComments(groupId, postId) {
  return (dispatch) => {
      dispatch(request())
      
        commentService.getPostComments(groupId, postId)
        .then(
          comments => {
            dispatch(success(comments));
          },
          error => {
            dispatch(failure(error));
          }
      );

      
  };

  function request() {return {type: commentConstants.GETPOSTCOMMENTS_REQUEST}}
  function success(comments) {return {type: commentConstants.GETPOSTCOMMENTS_SUCCESS, comments}}
  function failure(error) {return {type: commentConstants.GETPOSTCOMMENTS_FAILURE, error}}
}

function clear() {
  return dispatch => {
    dispatch(request());
  };

  function request() {return {type: commentConstants.CLEARREDUCER}}
}