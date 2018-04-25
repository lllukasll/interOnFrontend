import { authHeader, config } from '../helpers';

export const mainCategoryService = {
  getAll,
  createMainCategory
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/maincategories', requestOptions)
    .then(handleResponse, handleError);
}

function createMainCategory(mainCategory) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(mainCategory)
  };
  console.log("Create maincategory request : " + requestOptions.body);
  return fetch(config.apiUrl + '/api/maincategories', requestOptions)
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
