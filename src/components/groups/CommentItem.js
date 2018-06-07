import React from 'react';
import FormValidator from '../../helpers/FormValidator.js';
import { commentActions } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class CommentItem extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new FormValidator([
        {
            field: 'commentContent',
            method: 'isEmpty',
            validWhen: false,
            message: 'Treść jest wymagana'
        },
        {
            field: 'commentContent',
            method: 'isLength',
            args: [{min: 10, max: 250}],
            validWhen: true,
            message: 'Zły format (minimum 10 znaków max 250)'
        }
        ]);

        this.state = {
            commentContent: '',
            editComment: false,
            validation: this.validator.valid()
        };

        this.submitted = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editCommentClick = this.editCommentClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            commentContent: this.props.comment.content
        });
        //document.getElementById('commentContentInput').value = this.state.commentContent;
    }

    handleChange(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        if(validation.isValid) {
            var comment = {
                content: this.state.commentContent
            }
            this.setState({
                editComment: false
            })
            const { dispatch } = this.props;
            this.props.updateComment(this.props.comment.id, this.state.commentContent);
            dispatch(commentActions.updatePostComment(comment, this.props.groupId, this.props.post.id, this.props.comment.id));
        }
    }

    isUserAuthor(commentAuthorId, userId){
        //console.log('UserId : ' + userId + ' CommentAuthorId : ' + commentAuthorId);
        if(commentAuthorId === userId)
        {
            return true;
        } else
        {
            return false;
        }
    }

    editCommentClick(event, content){
        event.preventDefault();

        this.setState({
            editComment: !this.state.editComment
        })
    }

    render() {
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation


        const { comment, loggedUser } = this.props;
        const { editComment } = this.state;

        return(
            <div >
                {editComment ? 
                (<div className="row comments ">
                     <div className="col-md-1 offset-md-2 ">
                        <img alt="avatar" src="/images/av.jpg" className="comment-avatar" />
                    </div>
                    <div className="col-md-7 " >
                        {this.isUserAuthor(comment.user.id, loggedUser.loggedUserData.id) ? 
                        (<div>
                            <div style={{float: 'right', display: 'inline-block', cursor: 'pointer'}} id="dropdownMenuButtonComment" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Zakończ
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonComment">
                                <div className="dropdown-item">Anulować edycję ?</div>
                                <div style={{float: 'right', display: 'inline-block'}} ><button style={{cursor: 'pointer'}} className="dropdown-item">Nie</button></div>
                                {this.isUserAuthor(comment.user.id, loggedUser.loggedUserData.id) ? (<div style={{float: 'left', display: 'inline-block'}}><button onClick={this.editCommentClick} style={{cursor: 'pointer'}} className="dropdown-item">Tak</button></div>) : (<div></div>)}
                            </div>
                        </div>) : (<div></div>)}
                        <p><Link to={"../userProfile/" + comment.user.id}> {comment.user.name} {comment.user.surname} </Link></p>
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <textarea className="form-control" name="commentContent" id="commentContentInput" onChange={this.handleChange} defaultValue={comment.content} rows="2"></textarea>
                            <button type="submit" className="btn btn-secondary" id="submitPost">Aktualizuj </button>
                            <span className="help-block">{validation.commentContent.message}</span>
                        </div>
                        </form>
                    </div>
                </div>) : 
                (<div className="row comments ">
                    
                    <div className="col-md-1 offset-md-2 ">
                        <img alt="avatar" src="/images/av.jpg" className="comment-avatar" />
                    </div>
                    <div className="col-md-7 " >
                        {this.isUserAuthor(comment.user.id, loggedUser.loggedUserData.id) || this.props.isAdmin ? 
                        (<div>
                            <div style={{float: 'right', display: 'inline-block', cursor: 'pointer'}} id="dropdownMenuButtonComment" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-cog"></i>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonComment">
                                {this.isUserAuthor(comment.user.id, loggedUser.loggedUserData.id) ? (<div style={{float: 'right', display: 'inline-block', cursor: 'pointer'}} ><button onClick={this.editCommentClick} className="dropdown-item">Edytuj</button></div>) : (<div></div>)}
                                {this.isUserAuthor(comment.user.id, loggedUser.loggedUserData.id) || this.props.isAdmin ? (<div style={{ display: 'inline-block', cursor: 'pointer'}} ><button onClick={this.deleteCommentClick} className="dropdown-item">Usuń</button></div>) : (<div></div>)}
                            </div>
                        </div>) : (<div></div>)}
                        <p><Link to={"../userProfile/" + comment.user.id}>  {comment.user.name} {comment.user.surname} </Link>{comment.content}</p>
                        <hr />
                    </div>
                </div>)}
                
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

const connectedCommentItem = connect(mapStateToProps)(CommentItem);
export { connectedCommentItem as CommentItem };