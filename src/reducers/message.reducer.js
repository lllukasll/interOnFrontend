import { messageConstants } from '../constants';

const initialState = {
    loadingMessages: false,
    messages: [],
    error: []
};

export function messages(state = initialState, action) {
    switch (action.type) {
        case messageConstants.GETALLMESSAGES_REQUEST:
            return {
                ...state,
                loadingMessages: true
            };
        case messageConstants.GETALLMESSAGES_SUCCESS:
            return {
                ...state,
                loadingMessages: false,
                messages: action.messages
            };
        case messageConstants.GETALLMESSAGES_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case messageConstants.SENDMESSAGE_REQUEST:
            return {
                ...state,
                sending: true
            };
        case messageConstants.SENDMESSAGE_SUCCESS:
            return {
                ...state,
                message: action.message
            };
        case messageConstants.SENDMESSAGE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
            
        }
}