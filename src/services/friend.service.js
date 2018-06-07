import { authHeader, config } from '../helpers';

export const friendService = {
  getInvitations,
  getConfirmed,
  addFriend,
  confirmFriend,
  deleteFriend
};

function getInvitations() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/invitations', requestOptions)
    .then(handleResponse, handleError);
}

function getConfirmed() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/friends', requestOptions)
    .then(handleResponse, handleError);
}

function addFriend(id) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
  };

  return fetch(config.apiUrl + '/api/user/' + id + '/friends/add', requestOptions)
    .then(handleResponse, handleError);
}

function confirmFriend(id) {
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
  };

  return fetch(config.apiUrl + '/api/user/' + id + '/friends/confirm', requestOptions)
    .then(handleResponse, handleError);
}


function deleteFriend(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify()
  };

  return fetch(config.apiUrl + '/api/user/friends/remove/' + id, requestOptions)
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
