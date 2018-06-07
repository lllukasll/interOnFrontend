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

    render() {
        return (
            <div>
                {this.props.friend.userA.name} {this.props.friend.userA.surname}
                <button onClick={value => this.removeInvitation(this.props.friend.userA.id)}>Usuń</button>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
    };
}

export default connect(mapStateToProps)(FriendItem);