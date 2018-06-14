import { messageConstants } from '../constants';
import { messageService } from '../services';

export const messageActions = {
  getAllMessages,
  sendMessage
}

function getAllMessages(userId) {
  return dispatch => {
    dispatch(request());

    messageService.getAllMessages(userId)
      .then(
        messages => dispatch(success(messages)),
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: messageConstants.GETALLMESSAGES_REQUEST}}
  function success(messages) {return {type: messageConstants.GETALLMESSAGES_SUCCESS, messages}}
  function failure(error) {return {type: messageConstants.GETALLMESSAGES_FAILURE, error}}
}

function sendMessage(userId ,message) {
  return dispatch => {
    dispatch(request());

    messageService.sendMessage(userId, message)
      .then(
        message => {
          dispatch(success(message));
        },
        error => {
          dispatch(failure(error));
        }
      );
  };

  function request() {return {type: messageConstants.SENDMESSAGE_REQUEST}}
  function success(message) {return {type: messageConstants.SENDMESSAGE_SUCCESS, message}}
  function failure(error) {return {type: messageConstants.SENDMESSAGE_FAILURE, error}}
}