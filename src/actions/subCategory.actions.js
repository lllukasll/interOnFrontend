import { subCategoryConstants } from '../constants';
import { subCategoryService } from '../services';

export const subCategoryActions = {
  getAllForId,
  getAll
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
