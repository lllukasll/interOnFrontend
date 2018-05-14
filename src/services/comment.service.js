import { authHeader, config } from '../helpers';

export const commentService = {
  addPostComment,
  updatePostComment,
  getPostComments
};

function addPostComment(comment, groupId, postId) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  };

  return fetch(config.apiUrl + '/api/group/' + groupId + '/post/' + postId + '/comment', requestOptions)
    .then(handleResponse, handleError);
}

function updatePostComment(comment, groupId, postId, commentId) {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  };

  return fetch(config.apiUrl + '/api/group/' + groupId + '/post/' + postId + '/comment/' + commentId, requestOptions)
    .then(handleResponse, handleError);
}

function getPostComments(groupId, postId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/group/' + groupId + '/post/' + postId + '/comment', requestOptions)
    .then(handleResponse, handleError);
}

function handleResponse(response) {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        response.json().then(json => resolve(json));
      } else {
        resolve();
      }
    } else {
      response.text().then(text => reject(text));
    }
  });
}

function handleError(error) {
  return Promise.reject(error && error.message);
}
