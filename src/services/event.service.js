import { authHeader, config } from '../helpers';

export const eventService = {
  getAll,
  getOne
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