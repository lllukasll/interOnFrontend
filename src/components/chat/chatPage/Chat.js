import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { connect } from 'react-redux';
import { messageActions } from '../../../actions';
import { ReactAutoScroll } from 'react-to-target-auto-scroll';
import './ChatPage.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
      nick: '',
      message: '',
      messages: [],
      conversationName: "",
      hubConnection: null,
    };
  }

    componentWillReceiveProps(nextProps , prevProps) {
        
        console.log('Props has changed : ' + nextProps.conversationName);

        if(nextProps.conversationName !== this.props.conversationName){
            this.state.hubConnection
            .invoke('RemoveFromGroup', this.state.conversationName)
            .catch(err => console.error(err));

            this.setState({
                conversationName: nextProps.conversationName,
                messages: []
            })
            this.connectToHub(nextProps.conversationName);
        }

        

        if(nextProps.friendId !== this.props.friendId){this.props.dispatch(messageActions.getAllMessages(nextProps.friendId))}

    }


    componentDidMount = () => {
        this.connectToHub(this.props.conversationName);
    }

    connectToHub(group, connection)
    {
        
        //const nick = window.prompt('Your name:', 'John');
        const nick = this.props.loggedUser.loggedUserData.username;
        //const hubConnection = new HubConnection('http://localhost:63953/chat');
        const hubConnection = new HubConnectionBuilder()
                                .withUrl('http://localhost:63953/chat?conversation=' + group)
                                .build();

        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
            .start()
            .then(() => 
                console.log('Connection started!')
            )
            .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('RecieveMessage', (user, message) => {
                console.log(this.props.loggedUser.loggedUserData.username);
                if(user == this.props.loggedUser.loggedUserData.username)
                {
                    var dateFormat = new Date().toLocaleString()

                    //var dateTime = date.toLocaleDateString();
                    const messages = this.state.messages.concat([
                        <div class="message-container message-darker">
                            <img src="/images/av.jpg" alt="Avatar" class="right" style={{width: "100%", margin: "auto"}} />
                            <p>{message}</p>
                            <span class="message-time-left">{dateFormat}</span>
                        </div>
                    ]);
                    this.setState({ messages });
                }else{
                    var dateFormat = new Date().toLocaleString()

                    const messages = this.state.messages.concat([
                        <div class="message-container" >
                            <img src="/images/av.jpg" alt="Avatar" style={{width: "100%" , margin: "auto"}} />
                            <p>{message}</p>
                            <span class="message-time-right">{dateFormat}</span>
                        </div>
                    ]);
                    this.setState({ messages });
                }
            });
        });
    }

    sendMessage = (event) =>
    {
        event.preventDefault();
        this.state.hubConnection
            .invoke('SendChatMessage', this.state.nick , this.state.message)
            .catch(err => console.error(err));
            
        var messageModel = {
            content: this.state.message
        }

        this.props.dispatch(messageActions.sendMessage(this.props.friendId, messageModel));

        this.setState({message: ''});      
    };

    getMyDateFormat(data){
        var date = new Date(data);
        var dateTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        return dateTime;
    }


    render() {
        return (
            <div>
                <div className="messanger-header">
                    Rozmowa z {this.props.friendName}
                </div>

                <div className="messanger-messages">
                    {!this.props.messages || this.props.messages.loadingMessages ? (
                        <div><img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></div>
                    ) : (
                        <div>
                            {this.props.messages.messages.map((message, index) => (
                                <div>{(message.senderUser.id == this.props.loggedUser.loggedUserData.id) ? (
                                    <div class="message-container message-darker">
                                        <img src="/images/av.jpg" alt="Avatar" class="right" style={{width: "100%", margin: "auto"}} />
                                        <p>{message.content}</p>
                                        <span class="message-time-left">{this.getMyDateFormat(message.createDateTime)}</span>
                                    </div>
                                    ) : (
                                    <div class="message-container">
                                            <img src="/images/av.jpg" alt="Avatar" style={{width: "100%", margin: "auto"}} />
                                            <p>{message.content}</p>
                                            <span class="message-time-right">{this.getMyDateFormat(message.createDateTime)}</span>
                                    </div>)}
                                </div>
                            ))}
                        </div>
                    )}
                    {this.state.messages.map((message, index) => (
                    <span style={{display: 'block'}} key={index}> {message} </span>
                    ))}
                </div>
                <div className="messanger-submit">
                    <input type="text" className="messanger-send-input" value={this.state.message} onChange={e => this.setState({ message: e.target.value })} />
                    <button className="messanger-send-button" onClick={this.sendMessage}>Wyślij</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedUser, messages } = state;
    return {
        loggedUser,
        messages
    };
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };

//export default Chat;