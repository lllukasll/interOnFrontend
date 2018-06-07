import React from 'react';
import { connect } from 'react-redux';
import { commentActions, getPostComments  } from '../../actions';
import { CreateCommentItem } from './CreateCommentItem.js';
import { CommentItem } from './CommentItem.js';

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
        this.updateComment = this.updateComment.bind(this);
        this.addComment = this.addComment.bind(this);
        this.clearReducer = this.clearReducer.bind(this);
    }

    componentDidMount(){
        this.setState({
            //commentsFromDb: this.props.comments,
            synced: false
        })
    }

    componentDidUpdate(){
        const {synced} = this.state;
        const {comments} = this.props;

        if(comments.loadedComments && !synced)
        {
            this.setState({
                commentsFromDb: comments,
                synced: true,
            })
            //this.clearReducer();
            //this.forceUpdate();
        }
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
            this.clearReducer();
            this.props.dispatch(getPostComments(this.props.groupId, this.props.postId));
        }
    }

    addComment() {
        this.clearReducer();
        this.props.dispatch(getPostComments(this.props.groupId, this.props.postId));
    }

    updateComment(commentId, commentContent){
        var comments = Object.assign({}, this.state.commentsFromDb);
        comments.comments.find(c => c.id === commentId).content = commentContent;
        this.setState({
            commentsFromDb: Object.assign(this.state.commentsFromDb, comments)
        })
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
        const {showComments, commentsFromDb} = this.state;

        return(
            <div>
                {showComments ? (
                    <div>
                        <CreateCommentItem 
                            post={this.props.post} 
                            groupId={this.props.groupId} 
                            setSyncedToFalse={this.setSyncedToFalse.bind(this)} 
                            addComment={this.addComment} 
                            userInGroup={this.props.userInGroup}
                            isAdmin={this.props.isAdmin}
                        />
                            {commentsFromDb.comments && 
                            commentsFromDb.comments.map((comment, index) => 
                            <div key={comment.id}>
                                <CommentItem 
                                    groupId={this.props.groupId} 
                                    post={this.props.post} 
                                    comment={comment} 
                                    isAdmin={this.props.isAdmin} 
                                    updateComment={this.updateComment}
                                />
                            </div>
                            )}
                    </div>
                ) : (<div></div>)}
                <button style={{textAlign: 'center', cursor: 'pointer'}} className="row comments" onClick={this.showCommentsClick}>{!showComments ? (<div>Zobacz komentarze</div>) : (<div>Schowaj komentarze</div>)}</button>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    const { comments, loggedUser } = state;
    return {
       comments,
       loggedUser
    };
}

const connectedCommentsList = connect(mapStateToProps)(CommentsList);
export { connectedCommentsList as CommentsList };