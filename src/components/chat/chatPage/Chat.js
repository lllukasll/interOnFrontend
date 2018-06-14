import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { connect } from 'react-redux';

import './ChatPage.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      nick: '',
      message: '',
      messages: [],
      conversationName: "",
      hubConnection: null,
    };
  }

  componentWillReceiveProps(nextProps , prevProps) {
      console.log('Props has changed : ' + nextProps.conversationName);
      this.state.hubConnection
        .invoke('RemoveFromGroup', this.state.conversationName)
        .catch(err => console.error(err));

      this.setState({
          conversationName: nextProps.conversationName,
          messages: []
      })
      this.connectToHub(nextProps.conversationName);
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
                        <div class="message-container">
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

    sendMessage = () => {
    this.state.hubConnection
        .invoke('SendChatMessage', this.state.nick , this.state.message)
        .catch(err => console.error(err));
        
        this.setState({message: ''});      
    };

    render() {
        return (
            <div>
                <div className="messanger-header">
                    Rozmowa z {this.props.friendName}
                </div>
                <div className="messanger-messages">
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
    const { loggedUser } = state;
    return {
        loggedUser
    };
}

const connectedChat = connect(mapStateToProps)(Chat);
export { connectedChat as Chat };

//export default Chat;