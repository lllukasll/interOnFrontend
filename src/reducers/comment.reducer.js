import { commentConstants } from '../constants';

const initialState = {
  loading: false,
  created: false,
  isLoadingComments: false,
  loadedComments: false,
  comments: [],
  loadingCommentsError: [],
  error: null
};

export function comments(state = initialState, action) {
    switch (action.type) {
        case commentConstants.CREATEPOSTCOMMENT_REQUEST:
            return {
                loading: true
            };
        case commentConstants.CREATEPOSTCOMMENT_SUCCESS:
            return {
                created: true,
            };
        case commentConstants.CREATEPOSTCOMMENT_FAILURE:
            return {
                error: action.error
            };
        case commentConstants.GETPOSTCOMMENTS_REQUEST:
            return {
                isLoadingComments: true
            };
        case commentConstants.GETPOSTCOMMENTS_SUCCESS:
            return {
                loadedComments: true,
                comments: action.comments
            };
        case commentConstants.GETPOSTCOMMENTS_FAILURE:
            return {
                loadingCommentsError: action.error
            };
        case commentConstants.CLEARREDUCER:
            return {
                
            };
        default:
            return state
    }
}