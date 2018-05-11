import React from 'react';

import { groupActions } from '../../actions';
import { alertActions } from '../../actions';
import { postActions } from '../../actions';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';
import { config } from '../../helpers';
import FormValidator from '../../helpers/FormValidator.js';

import { PostsList } from './PostsList.js';

class Group extends React.Component {
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
      isLoading: true,
      userInGroup: false,
      isAdmin: false,
      validation: this.validator.valid()
    };

    this.submitted = false;

    this.joinGroup = this.joinGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isUserInGroup = this.isUserInGroup.bind(this);
  }

  joinGroup(event) {
    event.preventDefault();
    this.props.dispatch(groupActions.joinGroup(this.props.id)).then(
      () => this.props.dispatch(groupActions.getGroup(this.props.id))).then(
        (group) => this.checkIfAdmin(this.props.groups.group.userId, this.props.loggedUser.loggedUserData.id)).then(
        (group) => this.isUserInGroup(this.props.groups.group.users, this.props.loggedUser.loggedUserData.id));
  }

  leaveGroup(event) {
    event.preventDefault();
    this.props.dispatch(groupActions.leaveGroup(this.props.id)).then(
      () => this.props.dispatch(groupActions.getGroup(this.props.id))).then(
        (group) => this.checkIfAdmin(this.props.groups.group.userId, this.props.loggedUser.loggedUserData.id)).then(
        (group) => this.isUserInGroup(this.props.groups.group.users, this.props.loggedUser.loggedUserData.id));
  }

  componentDidMount() {
    this.props.dispatch(alertActions.clear());
    this.setState({isLoading: true});
    this.props.dispatch(groupActions.getGroup(this.props.id)).then(
        (group) => this.checkIfAdmin(this.props.groups.group.userId, this.props.loggedUser.loggedUserData.id)).then(
        (group) => this.isUserInGroup(this.props.groups.group.users, this.props.loggedUser.loggedUserData.id));
        
    this.props.dispatch(postActions.getGroupPosts(this.props.id));
    this.setState({isLoading:false});
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
    console.log(this.props.id);
    if(validation.isValid) {
        var post = {
            content: this.state.postContent
        }
        const { dispatch } = this.props;
        dispatch(postActions.addGroupPost(post, this.props.id));
    }

  }

  isUserInGroup(users, userId) {
    console.log('Check if user in group');
    this.setState({userInGroup:false});
    return new Promise((resolve, reject) => {
      users.forEach((element) => {
      if(element.id === userId)
      {
        console.log('Check if user in group | ElementId : ' + element.id + ' UserId : ' + userId);
        this.setState({userInGroup:true});
        resolve();
      } else {
        this.setState({userInGroup:false});
        console.log('User not in group');
        reject();
      }
    });
    });
    
  }

  checkIfAdmin(adminId, userId) {
    console.log('Check if user admin');
    this.setState({isAdmin: false});
    return new Promise((resolve, reject) => {
      if(adminId === userId)
      {
        this.setState({isAdmin: true})
        console.log('User is admin');
        resolve();
      } else {
        this.setState({isAdmin: false})
        console.log('User is not admin');
        reject();
      }
    });
    
  }


  render() {
    let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

    const { groups, posts, getAllPosts, loggedUser } = this.props;
    const { isLoading, userInGroup, isAdmin } = this.state;
    const { alert } = this.props;

    if(this.props.posts.created) {
      this.props.dispatch(postActions.getGroupPosts(this.props.id));
    }

    if(isLoading) {
      return <p>Loading ...</p>;
    }

    return (

      <section className="container">
        
        <div className="row ">

          <SideBar />
          <div class="col-md-9 content profile-changes">
          {groups.loadingGroup ? (<em>Ładowanie grupy <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          </em>) : (
            <div >
              <div class="row">
                <div class="col-md-12">
                  <h1>{groups.group.name}</h1>
                  <p id="group-name">Kategorie: {groups.group.subCategories.map((subcategory, index) => 
                    <div style={{display: 'inline-block'}}key={subcategory.id}>
                      <div> {subcategory.name} , </div>
                    </div>
                    )}</p>
                  <hr />
                </div>
              </div>

              <div class="row">
                <div class="col-md-4 ">
                  <img src={config.apiUrl + "/api/photo/" + groups.group.groupPhoto} alt="img"  class="group-photo" />
                </div>
                <div class="col-md-7 ">
                  <div class="row">
                    <div class="col-md-12 members-a ">
                      <p> {groups.group && groups.group.description}</p>
                      <a href='#'><span class="members" id="modalBtn"> Liczba członków: {groups.group.numberOfUsers} </span></a>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-md-12">
                      <span><Link className="check-mail-content-link-l" to={"/userProfile/" + groups.group.userId}>{isAdmin ? (<div>Jestes adminem</div>) : (<div>administrator</div>)}</Link></span>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" >
                <div class="col-md-8 offset-md-4 ">
                  <div class="btn-group dropright">
                    <button type="button" class="btn btn-secondary dropdown-toggle" id="dropRightEvents" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Wydarzenia Grupy
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Zobacz istniejące wydarzenia</a>
                      <a class="dropdown-item" href="#">Utwórz nowe wydarzenie</a>
                    </div>
                  </div>
                  {userInGroup ? 
                  ( 
                    <div class="btn-group dropright">
                      <button type="button" class="btn btn-secondary dropdown-toggle" id="dropRightExit" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-sign-out-alt"></i>
                      </button>
                      <div class="dropdown-menu">
                        <button type="button" onClick={this.leaveGroup} className="dropdown-item pointer-hand">Opuść grupę</button>
                      </div>
                    </div>
                  ) : 
                  (
                  <div class="btn">
                    <button type="button" class="btn btn-secondary join-group-btn" onClick={this.joinGroup}>Dołącz do grupy</button>
                  </div>
                  )}
                  
                   
              </div>
            </div>
              {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
            </div>
          )}
          </div>
        </div>

        <div class="row">
          <div class="col-md-11 content profile-changes">
            <h1> Posty</h1>
            <hr />
            <div class="row margin-post ">
              <div class="col-md-8 offset-md-2">
                <form onSubmit={this.handleSubmit}>
                  <div class={'form-group interest-content ' + validation.postContent.isInvalid && ' has-error'}>
                    <textarea class="form-control" rows="3" name="postContent" placeholder="Napisz post" onChange={this.handleChange}></textarea>
                    <span className="help-block">{validation.postContent.message}</span>
                    <button type="submit" class="btn btn-secondary" id="submitPost">Dodaj Post {posts.loading ?
                      (<img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />) : (<div></div>)
                    }</button>
                    {posts.created &&
                        <div className={`alert alert-success`}>Pomyślnie utworzono post</div>
                         
                    }
                    {posts.error &&
                        <div className={`alert alert-danger`}>{groups.error}</div>
                    }
                  </div>
                </form>
              </div>
            </div>

            <PostsList posts={this.props.posts.posts} groupId={this.props.id}/>

          </div>
        </div>


      </section>
    );
  }
}

function mapStateToProps(state, ownProps) {
    const { groups, posts, alert, loggedUser} = state;
    return {
        groups,
        alert,
        posts,
        loggedUser,
        //getAllPosts,
        id: ownProps.match.params.id
    };
}

const connectedGroup = connect(mapStateToProps)(Group);
export { connectedGroup as Group };
