import { eventConstants } from '../constants';

const initialState = {
  loading: false,
  events: [],
  error: []
};

export function events(state = initialState, action) {
    switch (action.type) {
        case eventConstants.EVENT_GETALL_REQUEST:
            return {
                loading: true
            };
        case eventConstants.EVENT_GETALL_SUCCESS:
            return {
                events: action.events
            };
        case eventConstants.EVENT_GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}