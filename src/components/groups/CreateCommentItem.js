import React from 'react';
import PropTypes from 'prop-types';
import FormValidator from '../../helpers/FormValidator.js';
import { commentActions } from '../../actions';
import { postActions } from '../../actions';
import { connect } from 'react-redux';

class CreateCommentItem extends React.Component {
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
            validation: this.validator.valid()
        };

        this.submitted = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            const { dispatch } = this.props;
            //console.log('GrupId ' + this.props.groupId + ' PostId ' + this.props.post.id + ' Comment ' + comment.content);
            dispatch(commentActions.addPostComment(comment, this.props.groupId, this.props.post.id));

        }
    }

    render() {
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation


        const { comments } = this.props;

        if(comments.created)
        {
            console.log(this.props.post.id);
            this.props.dispatch(postActions.getGroupPosts(this.props.groupId, this.props.post.id));
            this.props.dispatch(commentActions.clear());
        }

        return(
            <div>
                <div class="row comments">
                    <div class="col-md-8 offset-md-2">
                        <form onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <textarea class="form-control" id="exampleFormControlTextarea1" name="commentContent" onChange={this.handleChange} rows="2" placeholder="Napisz komenatrz"></textarea>
                            <button type="submit" class="btn btn-secondary" id="submitPost">Dodaj </button>
                            <span className="help-block">{validation.commentContent.message}</span>
                        </div>
                        </form>
                    </div>
                </div>
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

const connectedCreateCommentItem = connect(mapStateToProps)(CreateCommentItem);
export { connectedCreateCommentItem as CreateCommentItem };