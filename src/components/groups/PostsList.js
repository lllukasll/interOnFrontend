import React from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../../helpers/FormValidator.js';
import { commentActions } from '../../actions';
import { connect } from 'react-redux';
import { CreateCommentItem } from './CreateCommentItem.js';
import { CommentsList } from './CommentsList.js';

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

        const {showComments} = this.state;

        return(
            <div>
                {this.props.posts && 
                    this.props.posts.map((post, index) => 
                    <div key={post.id}>
                        <div class="row post under-post">
                            <div class="col-md-2">
                            <img src="/images/av.jpg" class="avatar" />
                            </div>
                            <div class="col-md-5">
                            <p class="font-weight-bold">{post.user.name} {post.user.surname}<br /> {this.getMyDateFormat(post.createDateTime)} </p>
                            </div>
                        </div>

                        <div class="row post border-post">
                            <div class="col-md-10 offset-md-1">
                            <p>
                                {post.content}
                            </p>
                            </div>
                        </div>
                        <div><CommentsList topComments={post.postComments} groupId={this.props.groupId} postId={post.id} post={post}/></div>
                        
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