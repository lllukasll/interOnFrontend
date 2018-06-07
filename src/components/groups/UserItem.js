import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';

import { friendActions } from '../../actions';

class UserItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }

    addFriend(id){
      this.props.dispatch(friendActions.addFriend(id));
    }

    render() {
        const { friends } = this.props;

        return (
            <div class="row  popup-friend margin-friend-input">
                <div class="col-md-1 ">
                    <img src="/images/av.jpg" class="avatar" />
                </div>
                <div class="col-md-10 offset-md-1 ">
                    <div class="row">
                        <a href="#"><span class="post-autor"> {this.props.user.name} {this.props.user.surname}</span></a>
                        </div>
                        <div class="row">
                        <Link to={"../userProfile/" + this.props.user.id} className="btn btn-default friends-btn">Zobacz profil</Link>
                        <button type="button" class="btn btn-default friends-btn" onClick={v => this.addFriend(this.props.user.id)}>
                            <i class="fas fa-user-plus"></i> Dodaj do znajomcyh
                        </button>
                        {friends && friends.friendAddedMessage ? (<div style={{margin: '10px auto', textAlign: 'center'}} className={`alert alert-success`}>{friends.friendAddedMessage}</div>) : (<div></div>)}
                        {friends && friends.addingFriendError ? (<div style={{margin: '10px auto', textAlign: 'center'}} className={`alert alert-danger`}>{friends.addingFriendError}</div>) : (<div></div>)}
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    const { friends } = state;
    return {
        friends
    };
}

export default connect(mapStateToProps)(UserItem);