import { groupConstants } from '../constants';

export function groups(state = {}, action) {
  switch (action.type) {
    case groupConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case groupConstants.GETALL_SUCCESS:
      return {
        groups: action.groups
      };
    case groupConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case groupConstants.GETGROUP_REQUEST:
      return {
        loadingGroup: true
      };
    case groupConstants.GETGROUP_SUCCESS:
      return {
        group: action.group
      };
    case groupConstants.GETGROUP_FAILURE:
      return {
        error: action.error
      };
    case groupConstants.CREATEGROUP_REQUEST:
      return { 
        creating: true 
      };
    case groupConstants.CREATEGROUP_SUCCESS:
      return {
        created:true,
        groupResponse: action.group
      };
    case groupConstants.CREATEGROUP_FAILURE:
      return {

      };
    case groupConstants.JOINGROUP_SUCCESS:
      return {
        ...state,
        joined: true
      };
    case groupConstants.LEAVEGROUP_SUCCESS:
    return {
      ...state,
      left: true
    };
    case groupConstants.UPLOADPHOTO_REQUEST:
      return { 
        uploadingPhoto: true 
      };
    case groupConstants.UPLOADPHOTO_SUCCESS:
      return {
        uploadedPhoto:true,
        photo: action.photo
      };
    case groupConstants.UPLOADPHOTO_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
    }
  }

