import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commentActions, getPostComments  } from '../../actions';
import { CreateCommentItem } from './CreateCommentItem.js';

class CommentsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showComments: false,
            synced: true,
            commentsFromDb: []
        }

        this.showCommentsClick = this.showCommentsClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.clearReducer = this.clearReducer.bind(this);
    }

    componentDidMount(){
        this.setState({
            synced: false
        })
    }

    showCommentsClick(event){
        event.preventDefault();
        const {showComments} = this.state;

        this.setState({
            showComments: !this.state.showComments,
        })

        if(!showComments)
        {
            this.setState({
                synced: false
            })
            this.props.dispatch(getPostComments(this.props.groupId, this.props.postId));
        }
    }

    clearReducer(){
        this.props.dispatch(commentActions.clear());
    }

    setSyncedToFalse(){
        this.setState({
            synced: false
        })
    }

    render() {
        const {showComments, commentsFromDb, synced, isLoading} = this.state;
        const {comments} = this.props;

        if(comments.loadedComments && !synced)
        {
            this.setState({
                commentsFromDb: comments,
                synced: true,
            })
            this.clearReducer();
        }

        return(
            <div>
                {showComments ? (
                    <div>
                        <CreateCommentItem post={this.props.post} groupId={this.props.groupId} setSyncedToFalse={this.setSyncedToFalse.bind(this)}/>
                            {commentsFromDb.comments && 
                            commentsFromDb.comments.map((comment, index) => 
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
                ) : (<div></div>)}
                <button style={{textAlign: 'center', cursor: 'pointer'}} class="row comments" onClick={this.showCommentsClick}>{!showComments ? (<div>Zobacz komentarze</div>) : (<div>Schowaj komentarze</div>)}</button>
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