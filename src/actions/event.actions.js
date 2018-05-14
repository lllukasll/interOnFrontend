import { eventConstants } from '../constants'
import { eventService } from '../services'

export const eventActions = {
    getAll
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