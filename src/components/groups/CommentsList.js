import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commentActions } from '../../actions';
import { CreateCommentItem } from './CreateCommentItem.js';

class CommentsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            seeAllComments: false,
            commentsFromDb: []
        }

        this.getAllComments = this.getAllComments.bind(this);
    }

    getAllComments(event) {
        event.preventDefault();
        this.props.dispatch(commentActions.getPostComments(this.props.groupId, this.props.postId));
        this.setState({seeAllComments: true})
    }

    render() {
        const {seeAllComments} = this.state;
        const {comments} = this.props;


        return(
            <div>
                <CreateCommentItem post={this.props.post} groupId={this.props.groupId} />
                    {this.props.topComments && 
                    this.props.topComments.map((comment, index) => 
                    <div key={comment.id}>

                    <div class="row comments ">
                        <div class="col-md-1 offset-md-2 ">
                            <img src="/images/av.jpg" class="comment-avatar" />
                        </div>
                        <div class="col-md-7 " >
                            <p> <a href="#"> {comment.user.name} {comment.user.surname} </a> {comment.content}</p>
                            <hr />
                        </div>
                    </div>
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

const connectedCommentsList = connect(mapStateToProps)(CommentsList);
export { connectedCommentsList as CommentsList };