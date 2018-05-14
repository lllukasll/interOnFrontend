import React from 'react';
import { connect } from 'react-redux';
import { CommentsList } from './CommentsList.js';
import { PostItem } from './PostItem.js';

class PostsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showComments: false
        }

        this.showCommentsClick = this.showCommentsClick.bind(this);
    }

    getMyDateFormat(data){
        var date = new Date(data);
        var dateTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        return dateTime;
    }

    showCommentsClick(event){
        event.preventDefault();
        const {showComments} = this.state;

        this.setState({
            showComments: !this.state.showComments
        })

        console.log({showComments});
    }

    render() {
        return(
            <div>
                {this.props.posts && 
                    this.props.posts.map((post, index) => 
                    <div key={post.id}>
                        <PostItem post={post} groupId={this.props.groupId} isAdmin={this.props.isAdmin}/>
                        <div><CommentsList topComments={post.postComments} groupId={this.props.groupId} postId={post.id} post={post} isAdmin={this.props.isAdmin}/></div>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { comments } = state;
    return {
        comments
    };
}

const connectedPostsList = connect(mapStateToProps)(PostsList);
export { connectedPostsList as PostsList };