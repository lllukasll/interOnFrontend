import { authHeader, config } from '../helpers';

export const groupService = {
  getAll,
  getGroup,
  createGroup,
  joinGroup
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/group', requestOptions)
    .then(handleResponse, handleError);
}

function getGroup(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/group/' + id, requestOptions)
    .then(handleResponse, handleError);
}

function createGroup(group) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(group)
  };

  return fetch(config.apiUrl + '/api/group', requestOptions)
    .then(handleResponse, handleError);
}

function joinGroup(id) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify()
  };

  return fetch(config.apiUrl + '/api/group/' + id, requestOptions)
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
