import { subCategoryConstants } from '../constants';
import { subCategoryService } from '../services';
import { alertActions } from './';

export const subCategoryActions = {
  getAllForId,
  getAll,
  createSubcategory
}

function getAllForId(id) {
  return dispatch => {
    dispatch(request());

    subCategoryService.getAllForId(id)
      .then(
        subCategories => dispatch(success(subCategories)),
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: subCategoryConstants.GETALLFORID_REQUEST}}
  function success(subCategories) {return {type: subCategoryConstants.GETALLFORID_SUCCESS, subCategories}}
  function failure(error) {return {type: subCategoryConstants.GETALLFORID_FAILURE, error}}
}

function getAll() {
  return dispatch => {
    dispatch(request());

    subCategoryService.getAll()
      .then(
        subCategories => dispatch(success(subCategories)),
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: subCategoryConstants.GETALL_REQUEST}}
  function success(subCategories) {return {type: subCategoryConstants.GETALL_SUCCESS, subCategories}}
  function failure(error) {return {type: subCategoryConstants.GETALL_FAILURE, error}}
}


function createSubcategory(subcategory) {
  return dispatch => {
    dispatch(request(subcategory));

    subCategoryService.createSubcategory(subcategory)
      .then(
        subcategory => {
          dispatch(success());
          dispatch(alertActions.success("Poprawnie dodano podkategorię"));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(group) {return {type: subCategoryConstants.CREATESUBCATEGORY_REQUEST, group}}
  function success() {return {type: subCategoryConstants.CREATESUBCATEGORY_SUCCESS}}
  function failure(error) {return {type: subCategoryConstants.CREATESUBCATEGORY_FAILURE, error}}
}