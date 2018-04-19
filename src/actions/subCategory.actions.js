import { subCategoryConstants } from '../constants';
import { subCategoryService } from '../services';

export const subCategoryActions = {
  getAll
}

function getAll(id) {
  return dispatch => {
    dispatch(request());

    subCategoryService.getAll(id)
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
