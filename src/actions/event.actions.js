import { eventConstants } from '../constants'
import { eventService } from '../services'

export const eventActions = {
    getAll,
    getOne
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