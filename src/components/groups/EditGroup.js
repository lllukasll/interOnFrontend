import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../common/sideBar/SideBar';
import { subCategoryActions, groupActions } from '../../actions';
import { history, config } from '../../helpers';
import FormValidator from '../../helpers/FormValidator.js';

class EditGroup extends React.Component {
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
      }
    ]);

    this.state = {
      isLoading: true,

      name: '',
      description: '',
      subcategories: [],
      allSubCategories: [],
      file: '',
      imagePreviewUrl: '',
      imagefromDbUrl: '',
      fileChoosen: false,
      categoryChoosen: false,

      groupData: [],
      createdGroupId: '',
      validation: this.validator.valid()
    };

    this.submitted = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
    this.checkIfAdmin = this.checkIfAdmin.bind(this);
  }

  checkIfPhotoUploaded = (fileChoosen, state) => (state.fileChoosen === false ? true : false)
  //checkIfCategoryChoosen = (categoryChoosen, state) => (state.categoryChoosen === false ? true : false)

  componentDidMount() {
    this.setState({isLoading: true});
    this.setState({group: {nazwa: 'zasda'}});
    
    this.props.dispatch(groupActions.getGroup(this.props.id)).then(
        (group) => this.updateInputValues(group)).then(
            () => this.props.dispatch(subCategoryActions.getAll())).then(
                (subCategories) => this.updateMultiselectValues(subCategories)).then(
                    () => this.checkIfAdmin(this.state.groupData.userId, this.props.loggedUser.loggedUserData.id));

    this.setState({isLoading:false});
  }

  updateInputValues(group) {
    return new Promise((resolve) => {
        var tmpArray = [];
        this.setState({
            name: group.name,
            description: group.description,
            imagefromDbUrl: group.groupPhoto,
            groupData: group
        })
        group.subCategories.forEach((element) => {
            tmpArray.push(element.id);
        });
        this.setState({
            subcategories : tmpArray
        })
        console.log('EditGroup | name : ' + group.name + ' description : ' + group.description + ' subcategories : ' + group.subCategories);
        resolve();
    });
  }

  updateMultiselectValues(subCategories) {
      return new Promise((resolve) => {
        this.setState({
            allSubCategories: subCategories
        })
        console.log('EditGroup | All Subcategories : ' + subCategories);
        resolve();
    });
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
        dispatch(groupActions.updateGroup(group, this.props.id));
      }
  }

  uploadPhoto(id) {
    const { file } = this.state;
    this.props.dispatch(groupActions.uploadPhoto(file, id));
    this.setState({
      createdGroupId: id
    })
  }

  checkIfAdmin(adminId, userId) {
      return new Promise ((resolve) => {
        if(adminId !== userId)
        {
            history.push("/group/" + this.props.id);
        } 
        resolve();
      });
      
  }

  render() {
    let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

    const { subCategories, groups } = this.props;
    const { isLoading, group, submitted, allSubCategories, subcategories, imagefromDbUrl } = this.state;

    if(isLoading) {
      return <p>Loading ...</p>;
    }

    

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img alt="placeholder" src={imagePreviewUrl} class="new-group-img" />);
    } else {
        if(groups.loadingGroup)
        {
            $imagePreview = (<img alt="placeholder" src="/images/placeholder.png" class="new-group-img" />);
        } else {
            $imagePreview = (<img alt="group" src={config.apiUrl + "/api/photo/" + imagefromDbUrl} class="group-photo" />);
        }
    }

    if(!groups.creating && groups.groupResponse) {
        if(!imagePreviewUrl) {
            history.push("/group/" + this.props.id);
        } else {
            this.uploadPhoto(this.props.id);
        }
      
    }

    if(groups.uploadingPhoto) {
      return <p>Uploading Photo ...</p>;
    }

    if(groups.uploadedPhoto) {
      history.push("/group/" + this.props.id);
    }

    return (
      <section className="container margin-top main">
	<div className="row ">

		<SideBar />

		<div className="col-md-9 content profile-changes ">
			<h1> Edytuj grupę </h1>
			<hr />
			<div className="row profile-changes">
				<div className="col-md-5 ">
                    {$imagePreview}
					<div className="margin-top">
						<form className="choose-group-photo">
							<label for="file" >
                            <input
                                type="file"
                                onChange={(e)=>this._handleImageChange(e)} 
                            />
							</label>
						</form>
					</div>
				</div>

			    <div className="col-md-7 ">
                    {groups.loadingGroup || subCategories.loadingAll ? (<em>Ładowanie kategorii <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </em>) : (
                    <div>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + validation.name.isInvalid && ' has-error'}>
                                <input type="text" className="form-control margin-top " name="name" onChange={this.handleChange} value={this.state.name} placeholder="Nazwa" />
                                <span style={{color: 'red'}}  className="help-block">{validation.name.message}</span>
                            </div>
                            <div>
                                {subCategories &&
                                <div className={'form-group' + (submitted && !group.subcategories ? ' has-error' : '')}>
                                    <select className="custom-select margin-top" name="subcategories" onChange={this.updateInputValue} value={subcategories} multiple>
                                    <option disabled selected value> -- Wybierz kategorie -- </option>
                                    {allSubCategories.map((cat, index) =>
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    )}
                                    </select>
                                </div>
                                }
                            </div>
                            <div className={'form-group' + validation.description.isInvalid && ' has-error'}>
                                <textarea className="form-control margin-top" rows="3" name="description" onChange={this.handleChange} value={this.state.description} placeholder="Opis"></textarea>
                                <span style={{color: 'red'}}  className="help-block">{validation.description.message}</span>
                            </div>
                            <button className="btn btn-secondary f-right ">Zapisz</button>
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


function mapStateToProps(state, ownProps) {
    const { subCategories, loggedUser } = state;
    const { groups } = state;
    const { alert } = state;
    return {
        subCategories,
        groups,
        alert,
        loggedUser,
        id: ownProps.match.params.id
    };
}

const connectedEditGroup = connect(mapStateToProps)(EditGroup);
export { connectedEditGroup as EditGroup };
