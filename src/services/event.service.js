import { authHeader, config } from '../helpers';

export const eventService = {
  getAll,
  getOne,
  createEvent,
  uploadPhoto
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/event', requestOptions)
    .then(handleResponse, handleError);
}

function getOne(eventId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/event/' + eventId, requestOptions)
    .then(handleResponse, handleError);
}

function createEvent(event) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  };
  //console.log("Create group request : " + requestOptions.body);
  return fetch(config.apiUrl + '/api/event', requestOptions)
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
  //console.log("Upload file request : " + requestOptions.body);
  return fetch(config.apiUrl + '/api/event/' + id + '/photo', requestOptions)
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