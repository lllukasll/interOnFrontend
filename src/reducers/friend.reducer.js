import { friendConstants } from '../constants';

const invitationsInitialState = {
    loadingInvitations: false,
    friendInvitations: [],
    invitationsError: [],
};

export function friendsInvitations(state = invitationsInitialState, action) {
    switch (action.type) {
        case friendConstants.GETINVITATIONS_REQUEST:
            return {
                loadingInvitations: true
            };
        case friendConstants.GETINVITATIONS_SUCCESS:
            return {
                friendInvitations: action.invitations
            };
        case friendConstants.GETINVITATIONS_FAILURE:
            return {
                invitationsError: action.error
            };
        default:
            return state
        
    }
}

const confirmedInitialState = {
    loadingConfirmedFriends: false,
    confirmedFirends: [],
    confirmedFriendError: [],
};

export function friendsConfirmed(state = confirmedInitialState, action) {
    switch (action.type) {
        case friendConstants.GETCONFIRMED_REQUEST:
            return {
                loadingConfirmedFriends: true
            };
        case friendConstants.GETCONFIRMED_SUCCESS:
            return {
                confirmedFirends: action.confirmedFriends
            };
        case friendConstants.GETCONFIRMED_FAILURE:
            return {
                confirmedFirendsError: action.error
            };
        default:
            return state
            
        }
}

const initialState = {
    addingFirends: false,
    confirmed: false,
    deleting: false,
    friendAddedMessage: null,
    confirmedFriendMessage: '',
    deletedFriendMessage: '',
    addingFriendError: null,
    confirmedFriendError: [],
    deletedFriendError: []
};

export function friends(state = initialState, action) {
  switch (action.type) {
    case friendConstants.ADDFRIEND_REQUEST:
      return {
        addingFirends: true
      };
    case friendConstants.ADDFRIEND_SUCCESS:
      return {
        friendAddedMessage: "Wysłano zaproszenie"
      };
    case friendConstants.ADDFRIEND_FAILURE:
      return {
        addingFriendError: action.error
      };
    case friendConstants.CONFIRMFRIEND_REQUEST:
      return {
        confirmed: true
      };
    case friendConstants.CONFIRMFRIEND_SUCCESS:
      return {
        confirmedFriendMessage: "Potwierdzono znajomość"
      };
    case friendConstants.CONFIRMFRIEND_FAILURE:
      return {
        confirmedFriendError: action.error
      };
    case friendConstants.DELETEFRIEND_REQUEST:
      return {
        deleting: true
      };
    case friendConstants.DELETEFRIEND_SUCCESS:
      return {
        deletedFriendMessage: "Usunięto znajomego"
      };
    case friendConstants.DELETEFRIEND_FAILURE:
      return {
        deletedFriendError: action.error
      };
    case friendConstants.CLEAR_INVITATIONS:
      return {
      };
    default:
      return state
    }
  }

