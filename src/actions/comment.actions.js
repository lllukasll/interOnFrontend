import { commentConstants } from '../constants';
import { commentService } from '../services';

export const commentActions = {
    addPostComment,
    //getPostComments,
    clear
}

function addPostComment(comment, groupId, postId) {
  return function (dispatch) {
    dispatch(request(comment));

    commentService.addPostComment(comment, groupId, postId)
      .then(
        comment => {
          dispatch(success(comment));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request(comment) {return {type: commentConstants.CREATEPOSTCOMMENT_REQUEST, comment}}
  function success(comment) {return {type: commentConstants.CREATEPOSTCOMMENT_SUCCESS, comment}}
  function failure(error) {return {type: commentConstants.CREATEPOSTCOMMENT_FAILURE, error}}
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