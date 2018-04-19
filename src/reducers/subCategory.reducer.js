import { subCategoryConstants } from '../constants';

export function subCategories(state = {}, action) {
  switch (action.type) {
    case subCategoryConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case subCategoryConstants.GETALL_SUCCESS:
      return {
        category: action.subCategories
      };
    case subCategoryConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
      default:
        return state
    }
  }
