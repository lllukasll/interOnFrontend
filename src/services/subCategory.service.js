import { authHeader, config } from '../helpers';

export const subCategoryService = {
  getAllForId,
  getAll,
  createSubcategory
};

function getAllForId(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/maincategories/' + id + '/subcategories', requestOptions)
    .then(handleResponse, handleError);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(config.apiUrl + '/api/subcategories', requestOptions)
    .then(handleResponse, handleError);
}

function createSubcategory(subcategory) {
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(subcategory)
  };
  console.log("Create subcategory request : " + requestOptions.body);
  return fetch(config.apiUrl + '/api/maincategories/1/subcategories', requestOptions)
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
