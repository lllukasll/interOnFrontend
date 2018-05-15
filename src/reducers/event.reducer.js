import { eventConstants } from '../constants';

const initialState = {
  loading: false,
  loadingOne: false,
  events: [],
  event: [],
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
        case eventConstants.EVENT_GETONE_REQUEST:
            return {
                loadingOne: true
            };
        case eventConstants.EVENT_GETONE_SUCCESS:
            return {
                event: action.event
            };
        case eventConstants.EVENT_GETONE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}