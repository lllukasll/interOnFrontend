import React from 'react';
import { groupActions } from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';
import { subCategoryActions } from '../../actions';
import { alertActions } from '../../actions';
import FormValidator from '../../helpers/FormValidator.js';

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
          field: 'name',
          method: 'isEmpty',
          validWhen: false,
          message: 'Nazwa jest wymagana'
      },
      {
          field: 'name',
          method: 'isLength',
          args: [{min: 0, max: 50}],
          validWhen: true,
          message: 'Nazwa jest za długia'
      },
      {
          field: 'description',
          method: 'isEmpty',
          validWhen: false,
          message: 'Opis jest wymagany'
      },
      {
          field: 'description',
          method: 'isLength',
          args: [{min: 0, max: 250}],
          validWhen: true,
          message: 'Opis jest za długi'
      },
      {
          field: 'fileChoosen',
          method: this.checkIfPhotoUploaded,
          validWhen: false,
          message: 'Zdjęcie jest wymagane'
      },
      {
          field: 'categoryChoosen',
          method: this.checkIfCategoryChoosen,
          validWhen: false,
          message: 'Musisz wybrać kategorię'
      },
    ]);

    this.state = {
      isLoading: true,

      name: '',
      description: '',
      subcategories: [],
      file: '',
      imagePreviewUrl: '',
      fileChoosen: false,
      categoryChoosen: false,
      validation: this.validator.valid()
    };

    this.submitted = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }

  checkIfPhotoUploaded = (fileChoosen, state) => (state.fileChoosen === false ? true : false)
  checkIfCategoryChoosen = (categoryChoosen, state) => (state.categoryChoosen === false ? true : false)

  componentDidMount() {
    this.setState({isLoading: true});
    this.setState({group: {nazwa: 'zasda'}});
    this.props.dispatch(subCategoryActions.getAll());
    this.setState({isLoading:false});
  }

  handleChange(event) {
      event.preventDefault();

      this.setState({
            [event.target.name]: event.target.value,
      });
  }
  
  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        fileChoosen: true
      });
    }
    
    reader.readAsDataURL(file)
  }

  updateInputValue(event){
    const { group } = this.state;
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
        subcategories: value,
        categoryChoosen: true
    })

  }

  handleSubmit(event) {
      event.preventDefault();

      const validation = this.validator.validate(this.state);
      this.setState({ validation });
      this.submitted = true;

      if(validation.isValid) {
        var group = {
          name: this.state.name,
          description: this.state.description,
          subcategories: this.state.subcategories,
        }

        const { dispatch } = this.props;
        dispatch(groupActions.createGroup(group));
      }
  }

  uploadPhoto(id) {
    const { file } = this.state;
    this.props.dispatch(groupActions.uploadPhoto(file, id));
  }

  render() {
    let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

    const { isLoading } = this.state;
    const { subCategories } = this.props;
    const { groups  } = this.props;
    const { group, submitted } = this.state;
    const { alert } = this.props;

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} class="new-group-img" />);
    } else {
      $imagePreview = (<img src="/images/ogorkowa.jpg" class="new-group-img" />);
    }


    if(isLoading) {
      return <p>Loading ...</p>;
    }

    if(!groups.creating && groups.groupResponse) {
      this.uploadPhoto(groups.groupResponse.id);
    }

    if(groups.uploadingPhoto) {
      return <p>Uploading Photo ...</p>;
    }

    return (
      <section class="container margin-top main">
	<div class="row ">

		<SideBar />

		<div class="col-md-9 content profile-changes ">
			<h1> Utwórz nową grupę </h1>
			<hr />
			<div class="row profile-changes">
				<div class="col-md-5 ">
          {$imagePreview}
					<div class="margin-top">
						<form>
							<label for="file">
              <input
                type="file"
                onChange={(e)=>this._handleImageChange(e)} />
							</label>
						</form>
					</div>
          <span className="help-block">{validation.fileChoosen.message}</span>
				</div>

			 <div class="col-md-7 ">
       {subCategories.loadingAll ? (<em>Ładowanie kategorii <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
       </em>) : (
         <div>
				<form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + validation.name.isInvalid && ' has-error'}>
            <input type="text" class="form-control margin-top " name="name" onChange={this.handleChange} placeholder="Nazwa" />
            <span className="help-block">{validation.name.message}</span>
          </div>
          <div>
            {subCategories &&
              <div className={'form-group' + (submitted && !group.subcategories ? ' has-error' : '')}>
                <select class="custom-select margin-top" name="subcategories" onChange={this.updateInputValue} multiple>
                  <option disabled selected value> -- Wybierz kategorie -- </option>
                  {subCategories.categories.map((cat, index) =>
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  )}
                </select>
                {submitted && !group.subcategories &&
                    <div className="help-block">Nazwa jest wymagana</div>
                }
              </div>
            }
            <span className="help-block">{validation.categoryChoosen.message}</span>
          </div>
          <div className={'form-group' + validation.description.isInvalid && ' has-error'}>
            <textarea class="form-control margin-top" rows="3" name="description" onChange={this.handleChange} placeholder="Opis"></textarea>
            <span className="help-block">{validation.description.message}</span>
          </div>
          <button class="btn btn-secondary f-right ">Utwórz grupę</button>
          {groups.creating &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
          {groups.created &&
              <div className={`alert alert-success`}>Pomyślnie utworzono grupę</div>
          }
          {groups.error &&
              <div className={`alert alert-danger`}>{groups.error}</div>
          }
        </form>

        </div>
        )}
			 </div>

		   </div>
		</div>
	</div>
</section>
    );
  }
}


function mapStateToProps(state) {
    const { subCategories } = state;
    const { groups } = state;
    const { alert } = state;
    return {
        subCategories,
        groups,
        alert
    };
}

const connectedCreateGroup = connect(mapStateToProps)(CreateGroup);
export { connectedCreateGroup as CreateGroup };
