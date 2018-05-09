import { authHeader, config } from '../helpers';

export const postService = {
  addGroupPost,
  getGroupPosts
};

function addGroupPost(post, id) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(post)
  };

  return fetch(config.apiUrl + '/api/group/' + id + '/post', requestOptions)
    .then(handleResponse, handleError);
}

function getGroupPosts(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/group/' + id + '/post', requestOptions)
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
