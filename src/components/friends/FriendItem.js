import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';

import { friendActions } from '../../actions';

class FriendItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }

    removeInvitation(id){
        this.props.dispatch(friendActions.deleteFriend(id)).then(friend => this.props.dispatch(friendActions.getConfirmed()))
    }

    getUserData(){
        if(this.props.friend.userA.id == this.props.authentication.user.clientId)
        {
            return this.props.friend.userB.name + ' ' + this.props.friend.userB.surname
        }else
        {
            return this.props.friend.userA.name + ' ' + this.props.friend.userA.surname
        }
    }

    render() {
        return (
            <div>
                {this.getUserData()}
                <button onClick={value => this.removeInvitation(this.props.friend.id)}>Usuń</button>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    const { authentication } = state;
    return {
        authentication
    };
}

export default connect(mapStateToProps)(FriendItem);