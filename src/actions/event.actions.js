import { eventConstants } from '../constants'
import { eventService } from '../services'

export const eventActions = {
    getAll,
    getOne,
    createEvent,
    uploadPhoto
}

function getAll() {
  return dispatch => {
    dispatch(request());

    eventService.getAll()
      .then(
        events => dispatch(success(events)),
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: eventConstants.EVENT_GETALL_REQUEST}}
  function success(events) {return {type: eventConstants.EVENT_GETALL_SUCCESS, events}}
  function failure(error) {return {type: eventConstants.EVENT_GETALL_FAILURE, error}}
}

function getOne(eventId) {
  return dispatch => {
    dispatch(request());

    eventService.getOne(eventId)
      .then(
        event => dispatch(success(event)),
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: eventConstants.EVENT_GETONE_REQUEST}}
  function success(event) {return {type: eventConstants.EVENT_GETONE_SUCCESS, event}}
  function failure(error) {return {type: eventConstants.EVENT_GETONE_FAILURE, error}}
}

function createEvent(event) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request(event));

    eventService.createEvent(event)
      .then(
        event => {
          dispatch(success(event));
          resolve(event);
          //dispatch(alertActions.success("Poprawnie dodano wydarzenie"));
        },
        error => {
          dispatch(failure(error));
          reject();
          //dispatch(alertActions.error(error));
        }
        );
    });
  };

  function request(event) {return {type: eventConstants.CREATEEVENT_REQUEST, event}}
  function success(event) {return {type: eventConstants.CREATEEVENT_SUCCESS, event}}
  function failure(error) {return {type: eventConstants.CREATEEVENT_FAILURE, error}}
}

function uploadPhoto(photo, id) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
    dispatch(request(photo));

    eventService.uploadPhoto(photo, id)
      .then(
        photo => {
          dispatch(success(photo));
          resolve();
        },
        error => {
          dispatch(failure(error));
          reject();
          //dispatch(alertActions.error(error));
         }
        );
    });
  };

  function request(photo) {return {type: eventConstants.UPLOADPHOTO_REQUEST, photo}}
  function success(photo) {return {type: eventConstants.UPLOADPHOTO_SUCCESS, photo}}
  function failure(error) {return {type: eventConstants.UPLOADPHOTO_FAILURE, error}}
}