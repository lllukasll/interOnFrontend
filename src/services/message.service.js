import { authHeader, config } from '../helpers';

export const messageService = {
  getAllMessages,
  sendMessage
};

function getAllMessages(userId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/messages/' + userId , requestOptions)
    .then(handleResponse, handleError);
}

function sendMessage(userId, message) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(message)
  };
  console.log("Create group request : " + requestOptions.body);
  return fetch(config.apiUrl + '/api/messages/' + userId + '/send', requestOptions)
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
