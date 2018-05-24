import { eventConstants } from '../constants';

const initialState = {
  loading: false,
  loadingOne: false,
  events: [],
  event: [],
  error: [],
  creatingEvent: false,
  createdEvent: false,
  eventResponse: [],
  uploadingPhoto: false,
  uploadedPhoto: false,
  photo: [],
  created: false    
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
        case eventConstants.CREATEEVENT_REQUEST:
            return { 
                creatingEvent: true 
            };
        case eventConstants.CREATEEVENT_SUCCESS:
            return {
                createdEvent:true,
                eventResponse: action.event
            };
        case eventConstants.CREATEEVENT_FAILURE:
            return {
                error: action.error
            };
        case eventConstants.UPLOADPHOTO_REQUEST:
            return { 
                uploadingPhoto: true 
            };
        case eventConstants.UPLOADPHOTO_SUCCESS:
            return {
                created:true,
                uploadedPhoto:true,
                photo: action.photo
            };
        case eventConstants.UPLOADPHOTO_FAILURE:
            return {
                error: action.error
            };    
        default:
            return state
    }
}