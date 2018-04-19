import { mainCategoryConstants } from '../constants';
import { mainCategoryService } from '../services';

export const mainCategoryActions = {
  getAll
}

function getAll() {
  return dispatch => {
    dispatch(request());

    mainCategoryService.getAll()
      .then(
        mainCategories => dispatch(success(mainCategories)),
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: mainCategoryConstants.GETALL_REQUEST}}
  function success(mainCategories) {return {type: mainCategoryConstants.GETALL_SUCCESS, mainCategories}}
  function failure(error) {return {type: mainCategoryConstants.GETALL_FAILURE, error}}
}
