import { authHeader, config } from '../helpers';

export const postService = {
  addGroupPost,
  updateGroupPost,
  getGroupPosts,
  getEventPosts
};

function addGroupPost(post) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(post)
  };

  return fetch(config.apiUrl + '/api/post/', requestOptions)
    .then(handleResponse, handleError);
}

function updateGroupPost(post, postId) {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(post)
  };

  return fetch(config.apiUrl + '/api/post/' + postId, requestOptions)
    .then(handleResponse, handleError);
}

function getGroupPosts(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/post/group/' + id , requestOptions)
    .then(handleResponse, handleError);
}

function getEventPosts(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/post/event/' + id , requestOptions)
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
