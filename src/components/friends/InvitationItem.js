import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';

import { friendActions } from '../../actions';

class InvitationItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }

        this.confirmFriendship = this.confirmFriendship.bind(this);
    }

    confirmFriendship(id){
        this.props.dispatch(friendActions.confirmFriend(id)).then(friend => this.props.dispatch(friendActions.getConfirmed())).then(confirmedFriends => this.props.dispatch(friendActions.getInvitations()))
    }

    removeInvitation(id){
        this.props.dispatch(friendActions.deleteFriend(id)).then(friend => this.props.dispatch(friendActions.getConfirmed())).then(confirmedFriends => this.props.dispatch(friendActions.getInvitations()))
    }

    render() {
        return (
            <div>
                {this.props.friend.userA.name} {this.props.friend.userA.surname}
                <button onClick={value => this.confirmFriendship(this.props.friend.userA.id)}>Potwierdź</button>
                <button onClick={value => this.removeInvitation(this.props.friend.userA.id)}>Odrzuć</button>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
    };
}

export default connect(mapStateToProps)(InvitationItem);