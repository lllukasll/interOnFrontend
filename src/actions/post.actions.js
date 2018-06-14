import { postConstants } from '../constants';
import { postService } from '../services';

export const postActions = {
    addGroupPost,
    updateGroupPost,
    getGroupPosts
}

function addGroupPost(post) {
  return dispatch => {
    dispatch(request(post));

    postService.addGroupPost(post)
      .then(
        post => {
          dispatch(success(post));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request(post) {return {type: postConstants.CREATEGROUPPOST_REQUEST, post}}
  function success(post) {return {type: postConstants.CREATEGROUPPOST_SUCCESS, post}}
  function failure(error) {return {type: postConstants.CREATEGROUPPOST_FAILURE, error}}
}

function updateGroupPost(post,postId) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request(post));

    postService.updateGroupPost(post,postId)
      .then(
        post => {
          dispatch(success(post));
          resolve(post);
        },
        error => {
          dispatch(failure(error));
          reject(error);
        }
        );
    });
  };

  function request(post) {return {type: postConstants.CREATEGROUPPOST_REQUEST, post}}
  function success(post) {return {type: postConstants.CREATEGROUPPOST_SUCCESS, post}}
  function failure(error) {return {type: postConstants.CREATEGROUPPOST_FAILURE, error}}
}

function getGroupPosts(id) {
  return dispatch => {
    dispatch(request());

    postService.getGroupPosts(id)
      .then(
        posts => {
          dispatch(success(posts));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: postConstants.GETGROUPPOSTS_REQUEST}}
  function success(posts) {return {type: postConstants.GETGROUPPOSTS_SUCCESS, posts}}
  function failure(error) {return {type: postConstants.GETGROUPPOSTS_FAILURE, error}}
}