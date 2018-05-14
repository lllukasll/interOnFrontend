import React from 'react';
import { groupActions } from '../../actions';
import { connect } from 'react-redux';
import SideBar from '../common/sideBar/SideBar';
import { subCategoryActions } from '../../actions';
import FormValidator from '../../helpers/FormValidator.js';
import { history } from '../../helpers';

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
          message: 'Nazwa jest za długia (max 50 znaków)'
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
          message: 'Opis jest za długi (max 250 znaków)'
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

      createdGroupId: '',
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

    if(file && file.type.match('image.*'))
    {
        reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          fileChoosen: true
        });
      }
      reader.readAsDataURL(file)
    }else{
      this.setState({
        file: '',
        imagePreviewUrl: '',
        fileChoosen: false,
      })
    }
      
  }

  updateInputValue(event){
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
    this.setState({
      createdGroupId: id
    })
  }

  render() {
    let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

    const { isLoading } = this.state;
    const { subCategories } = this.props;
    const { groups  } = this.props;
    const { group, submitted } = this.state;

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img alt="placeholder" src={imagePreviewUrl} class="new-group-img" />);
    } else {
      $imagePreview = (<img alt="group" src="/images/placeholder.png" class="new-group-img" />);
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

    if(groups.uploadedPhoto) {
      history.push("/group/" + this.state.createdGroupId);
    }

    return (
      <section class="container margin-top main">
	<div class="row ">

		<SideBar />

		<div className="col-md-9 content profile-changes ">
			<h1> Utwórz nową grupę </h1>
			<hr />
			<div className="row profile-changes">
				<div className="col-md-5 ">
          {$imagePreview}
					<div className="margin-top">
						<form className="choose-group-photo">
							<label for="file" >
              <input
                type="file"
                onChange={(e)=>this._handleImageChange(e)} />
							</label>
						</form>
					</div>
          <span style={{color: 'red'}}  className="help-block">{validation.fileChoosen.message}</span>
				</div>

			 <div className="col-md-7 ">
       {subCategories.loadingAll ? (<em>Ładowanie kategorii <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
       </em>) : (
         <div>
				<form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + validation.name.isInvalid && ' has-error'}>
            <input type="text" className="form-control margin-top " name="name" onChange={this.handleChange} placeholder="Nazwa" />
            <span style={{color: 'red'}}  className="help-block">{validation.name.message}</span>
          </div>
          <div>
            {subCategories &&
              <div className={'form-group' + (submitted && !group.subcategories ? ' has-error' : '')}>
                <select className="custom-select margin-top" name="subcategories" onChange={this.updateInputValue} multiple>
                  <option disabled selected value> -- Wybierz kategorie -- </option>
                  {subCategories.categories.map((cat, index) =>
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  )}
                </select>
              </div>
            }
            <span style={{color: 'red'}}  className="help-block">{validation.categoryChoosen.message}</span>
          </div>
          <div className={'form-group' + validation.description.isInvalid && ' has-error'}>
            <textarea className="form-control margin-top" rows="3" name="description" onChange={this.handleChange} placeholder="Opis"></textarea>
            <span style={{color: 'red'}}  className="help-block">{validation.description.message}</span>
          </div>
          <button className="btn btn-secondary f-right ">Utwórz grupę</button>
          {groups.creating &&
              <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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
