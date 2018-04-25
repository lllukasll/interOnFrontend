import { mainCategoryConstants } from '../constants';
import { mainCategoryService } from '../services';
import { alertActions } from './';

export const mainCategoryActions = {
  getAll,
  createMainCategory
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

function createMainCategory(mainCategory) {
  return dispatch => {
    dispatch(request(mainCategory));

    mainCategoryService.createMainCategory(mainCategory)
      .then(
        mainCategory => {
          dispatch(success());
          dispatch(alertActions.success("Poprawnie dodano kategorię"));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(group) {return {type: mainCategoryConstants.CREATEMAINCATEGORY_REQUEST, group}}
  function success() {return {type: mainCategoryConstants.CREATEMAINCATEGORY_SUCCESS}}
  function failure(error) {return {type: mainCategoryConstants.CREATEMAINCATEGORY_FAILURE, error}}
}
