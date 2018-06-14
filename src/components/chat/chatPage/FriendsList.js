import React, { Component } from 'react';

class Chat extends Component {
    
    render() {
        return (
            <div>
            <br />
            <input
                type="text"
                value={this.state.message}
                onChange={e => this.setState({ message: e.target.value })}
            />

            <button onClick={this.sendMessage}>Send</button>

            <div>
                {this.state.messages.map((message, index) => (
                <span style={{display: 'block'}} key={index}> {message} </span>
                ))}
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