import { authHeader, config } from '../helpers';

export const groupService = {
  getAll,
  getGroup,
  createGroup,
  updateGroup,
  uploadPhoto,
  joinGroup,
  leaveGroup
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
  console.log("Create group request : " + requestOptions.body);
  return fetch(config.apiUrl + '/api/group', requestOptions)
    .then(handleResponse, handleError);
}

function updateGroup(group, id) {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(group)
  };
  return fetch(config.apiUrl + '/api/group/' + id, requestOptions)
    .then(handleResponse, handleError);
}

function uploadPhoto(photo, id) {
  const formData = new FormData();
        formData.append('file', photo);

  const requestOptions = {
    method: 'POST',
    headers: {...authHeader()},
    body: formData
  };
  console.log("Upload file request : " + requestOptions.body);
  return fetch(config.apiUrl + '/api/group/' + id + '/photo', requestOptions)
    .then(handleResponse, handleError);
}

function joinGroup(id) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify()
  };

  return fetch(config.apiUrl + '/api/group/' + id + '/user', requestOptions)
    .then(handleResponse, handleError);
}

function leaveGroup(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify()
  };

  return fetch(config.apiUrl + '/api/group/' + id + '/user/', requestOptions)
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
