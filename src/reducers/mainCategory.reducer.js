import { mainCategoryConstants } from '../constants';

export function mainCategories(state = {}, action) {
  switch (action.type) {
    case mainCategoryConstants.CREATEMAINCATEGORY_REQUEST:
    return {
      creating: true
    }
    case mainCategoryConstants.CREATEMAINCATEGORY_SUCCESS:
    return {
     
    }
    case mainCategoryConstants.CREATEMAINCATEGORY_FAILURE: 
      return{
        error: action.error
    }
    case mainCategoryConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case mainCategoryConstants.GETALL_SUCCESS:
      console.log("dodano")
      return {
        category: action.mainCategories
      };
    case mainCategoryConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
      default:
        return state
    }
  }
