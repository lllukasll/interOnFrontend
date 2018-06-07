import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserItem from './UserItem.js';

class UsersList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
        }
    }

    render() {
        const { friends } = this.props;

        return (
            <div style={{width: "800px"}}>
                <div class="row">
                    <div class="col-md-8 offset-md-2 ">
                        <div class="input-group mb-3  ">
                        <input type="text" class="form-control" placeholder="Wyszukaj" />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>

                {this.props.users.map((user, indeks) => 
                    <UserItem user={user} />
                )}
                {friends && friends.friendAddedMessage && <div style={{margin: '10px auto', textAlign: 'center'}} className={`alert alert-success`}>{friends.friendAddedMessage}</div>}
                {friends && friends.addingFriendError && <div style={{margin: '10px auto', textAlign: 'center'}} className={`alert alert-danger`}>{friends.addingFriendError}</div>}
                   

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

export default connect(mapStateToProps)(UsersList);