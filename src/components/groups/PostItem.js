import React from 'react';
import FormValidator from '../../helpers/FormValidator.js';
import { postActions } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostItem extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new FormValidator([
        {
            field: 'postContent',
            method: 'isEmpty',
            validWhen: false,
            message: 'Treść jest wymagana'
        },
        {
            field: 'postContent',
            method: 'isLength',
            args: [{min: 10, max: 250}],
            validWhen: true,
            message: 'Zły format (minimum 10 znaków max 250)'
        }
        ]);

        this.state = {
            postContent: '',
            editPost: false,
            validation: this.validator.valid()
        };

        this.submitted = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editPostClick = this.editPostClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            postContent: this.props.post.content
        });
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
            var post = {
                content: this.state.postContent
            }
            this.setState({
                editPost: false
            })
            const { dispatch } = this.props;
            dispatch(postActions.updateGroupPost(post, this.props.groupId, this.props.post.id));
            //console.log('Dispatch Update Group Post | post " ' + post.content + ' groupId : ' + this.props.groupId + ' postId : ' + this.props.post.id);
        }
    }

    isUserAuthor(postAuthorId, userId){
        //console.log('UserId : ' + userId + ' PostAuthorId : ' + postAuthorId);
        if(postAuthorId === userId)
        {
            return true;
        } else
        {
            return false;
        }
    }

    editPostClick(event, content){
        event.preventDefault();

        this.setState({
            editPost: !this.state.editPost
        })
    }

    getMyDateFormat(data){
        var date = new Date(data);
        var dateTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        return dateTime;
    }


    render() {
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation


        const { posts, post, loggedUser } = this.props;
        const { editPost } = this.state;

        return(
            <div >
                {editPost ? 
                (<div className="row post under-post">
                    <div className="col-md-2">
                        <img alt="avatar" src="/images/av.jpg" className="avatar" />
                    </div>
                    <div className="col-md-5">
                        <p className="font-weight-bold" ><Link to={"../userProfile/" + post.user.id}> {post.user.name} {post.user.surname} </Link><br /> {this.getMyDateFormat(post.createDateTime)} </p>
                    </div>
                    <div className="col-md-5">
                        {this.isUserAuthor(post.user.id, loggedUser.loggedUserData.id) ? 
                        (<div>
                            <div style={{float: 'right', display: 'inline-block', cursor: 'pointer'}} id="dropdownMenuButtonComment" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Zakończ
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonComment">
                                <div className="dropdown-item">Anulować edycję ?</div>
                                <div style={{float: 'right', display: 'inline-block'}} ><button style={{cursor: 'pointer'}} className="dropdown-item">Nie</button></div>
                                <div style={{float: 'left', display: 'inline-block'}} ><button onClick={this.editPostClick} style={{cursor: 'pointer'}} className="dropdown-item" >Tak</button></div>
                            </div>
                        </div>) : (<div></div>)}
                        
                    </div>
                        
                    <div className="col-md-10 offset-md-1">
                        <form onSubmit={this.handleSubmit}>
                            <div className={'form-group interest-content ' + validation.postContent.isInvalid && ' has-error'}>
                                <textarea className="form-control" rows="3" name="postContent" onChange={this.handleChange} defaultValue={post.content}></textarea>
                                <span className="help-block">{validation.postContent.message}</span>
                                <button type="submit" className="btn btn-secondary" id="submitPost">Aktualizuj Post {posts.loading ?
                                (<img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />) : (<div></div>)
                                }</button>
                            </div>
                        </form>
                    </div>
                </div>) : 
                (<div>
                    <div className="row post under-post">
                        <div className="col-md-2">
                            <img alt="avatar" src="/images/av.jpg" className="avatar" />
                        </div>
                        <div className="col-md-5">
                            <p className="font-weight-bold"><Link to={"../userProfile/" + post.user.id}>{post.user.name} {post.user.surname}</Link><br /> {this.getMyDateFormat(post.createDateTime)} </p>
                        </div>
                        <div className="col-md-5">
                            {this.isUserAuthor(post.user.id, loggedUser.loggedUserData.id) || this.props.isAdmin ? 
                            (<div>
                                <div style={{float: 'right', display: 'inline-block', cursor: 'pointer'}} id="dropdownMenuButtonPost" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-cog"></i>
                                </div>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonPost">
                                    {this.isUserAuthor(post.user.id, loggedUser.loggedUserData.id) ? (<div style={{float: 'right', display: 'inline-block'}}><button onClick={this.editPostClick} style={{cursor: 'pointer'}} className="dropdown-item">Edytuj</button></div>) : (<div></div>)}
                                    {this.isUserAuthor(post.user.id, loggedUser.loggedUserData.id) || this.props.isAdmin ? (<div style={{float: 'left', display: 'inline-block'}}><button onClick={this.deletePostClick} style={{cursor: 'pointer'}} className="dropdown-item">Usuń</button></div>) : (<div></div>)}
                                </div>
                            </div>) : (<div></div>)}
                        </div>
                        
                    </div>
                    
                    <div className="row post border-post">
                        <div className="col-md-10 offset-md-1">
                            <p>{post.content}</p>
                        </div>
                    </div>
                </div>)}
                
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { loggedUser, posts } = state;
    return {
        posts,
        loggedUser
    };
}

const connectedPostItem = connect(mapStateToProps)(PostItem);
export { connectedPostItem as PostItem };