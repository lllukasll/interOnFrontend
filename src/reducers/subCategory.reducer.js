import { subCategoryConstants } from '../constants';

export function subCategories(state = {}, action) {
  switch (action.type) {
    case subCategoryConstants.GETALLFORID_REQUEST:
      return {
        loading: true
      };
    case subCategoryConstants.GETALLFORID_SUCCESS:
      return {
        category: action.subCategories
      };
    case subCategoryConstants.GETALLFORID_FAILURE:
      return {
        error: action.error
      };
    case subCategoryConstants.GETALL_REQUEST:
      return {
        loadingAll: true
      };
    case subCategoryConstants.GETALL_SUCCESS:
      return {
        categories: action.subCategories
      };
    case subCategoryConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case subCategoryConstants.CREATESUBCATEGORY_REQUEST:
      return {
        creating: true
      };
    case subCategoryConstants.CREATESUBCATEGORY_SUCCESS:
      return {
        
      };
    case subCategoryConstants.CREATESUBCATEGORY_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
    }
  }
