import React from 'react';
import Sidebar from '../../common/sideBar/SideBar.js'
import { eventActions, postActions, friendActions } from '../../../actions'
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import MapContainer from '../../map/MapContainer';

import { Chat } from './Chat';
import './ChatPage.css';

class ChatPage extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            isLoading: true,
            conversationId: "",
            friendName: "",
            friendId: null
        }
    }

    componentDidMount(){
        this.setState({isLoading: true})
        this.props.dispatch(friendActions.getConfirmed());
        this.setState({isLoading: false})
    }

    renderSpiner(){
        return(
            <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        );
    }

    getUserData(friend){
        if(friend.userA.id == this.props.authentication.user.clientId)
        {
            return friend.userB.name + ' ' + friend.userB.surname
        }else
        {
            return friend.userA.name + ' ' + friend.userA.surname
        }
    }

    changePerson(friend){
        console.log(friend.conversationName);
        this.setState({
            conversationId: friend.conversationName
        })
        if(friend.userA.id == this.props.authentication.user.clientId)
        {
            this.setState({
                friendName: friend.userB.name + ' ' + friend.userB.surname,
                friendId: friend.userB.id
            })
        }else
        {
            this.setState({
                friendName: friend.userA.name + ' ' + friend.userA.surname,
                friendId: friend.userA.id
            })
        }
    }

    render(){
        const { friendsConfirmed } = this.props;

        if(this.state.isLoading){
            return(
                this.renderSpiner()
            )
        }

        return(
            <div className="container">
                <div className="row">
                    <Sidebar />
                    <div className="col-md-9 content profile-changes">
                        <div className="messanger">
                            <div className="messanger-list-of-friends">
                                <ul>
                                    {!friendsConfirmed || friendsConfirmed.loadingConfirmedFriends ?  (this.renderSpiner()) : 
                                    (<div>
                                        {friendsConfirmed.confirmedFirends.map((friend,indeks) => 
                                        <li onClick={(e) => this.changePerson(friend)}>{this.getUserData(friend)}</li>
                                        )}
                                    </div>
                                    )}
                                </ul>
                            </div>
                            <div className="messanger-message-placeholder">
                                <Chat conversationName={this.state.conversationId} friendName={this.state.friendName} friendId={this.state.friendId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { friendsConfirmed, authentication } = state;
    return {
        friendsConfirmed,
        authentication,
        id: ownProps.match.params.id
    };
}

export default connect(mapStateToProps)(ChatPage);