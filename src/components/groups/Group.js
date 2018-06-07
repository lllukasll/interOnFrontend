import React from 'react';

import { groupActions, alertActions, postActions, friendActions } from '../../actions';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';
import { config } from '../../helpers';
import FormValidator from '../../helpers/FormValidator.js';
import Modal from 'react-responsive-modal';
import { PostsList } from './PostsList.js';
import UsersList from './UsersList.js';

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
      openUsersList: false,
      validation: this.validator.valid()
    };

    this.submitted = false;

    this.joinGroup = this.joinGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isUserInGroup = this.isUserInGroup.bind(this);
  }

  changeModalState = () => { this.setState({ openUsersList: !this.state.openUsersList }) };

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
    //console.log(this.props.id);
    if(validation.isValid) {
        var post = {
            content: this.state.postContent
        }
        const { dispatch } = this.props;
        dispatch(postActions.addGroupPost(post, this.props.id));
    }

  }

  isUserInGroup(users, userId) {
    //console.log('Check if user in group');
    this.setState({userInGroup:false});
    return new Promise((resolve, reject) => {
      users.forEach((element) => {
      if(element.id === userId)
      {
        //console.log('Check if user in group | ElementId : ' + element.id + ' UserId : ' + userId);
        this.setState({userInGroup:true});
        resolve();
      }
    });
    });
  }

  checkIfAdmin(adminId, userId) {
    //console.log('Check if user admin');
    this.setState({isAdmin: false});
    return new Promise((resolve, reject) => {
      if(adminId === userId)
      {
        this.setState({isAdmin: true})
        //console.log('User is admin');
        resolve();
      } else {
        this.setState({isAdmin: false})
        //console.log('User is not admin');
        resolve();
      }
    });
    
  }


  render() {
    let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

    const { groups, posts } = this.props;
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
          <div className="col-md-9 content profile-changes">
          {groups.loadingGroup ? (<em>Ładowanie grupy <img alt="spinner" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          </em>) : (
            <div >
              <div className="row">
                <div className="col-md-12">{isAdmin ? 
                  (<div>
                    <Link to={"/editGroup/" + groups.group.id}>
                      <button style={{display: 'inline-block', float: 'right', marginTop: '10px'}} >
                        Edytuj
                      </button>
                    </Link>
                    <Link to={"/editGroup/" + groups.group.id}>
                    <button style={{display: 'inline-block', float: 'right', marginTop: '10px'}} >
                      Usuń
                    </button>
                    </Link>
                  </div>) : (<div></div>)}
                  <h1>{groups.group.name}</h1>
                  <div id="group-name">Kategorie: {groups.group.subCategories.map((subcategory, index) => 
                    <div style={{display: 'inline-block'}}key={subcategory.id}>
                      <div> {subcategory.name} , </div>
                    </div>
                    )}</div>
                  <hr />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-4 ">
                  <img src={config.apiUrl + "/api/photo/" + groups.group.groupPhoto} alt="img"  className="group-photo" />
                </div>
                <div className="col-md-7 ">
                  <div className="row">
                    <div className="col-md-12 members-a ">
                      <p> {groups.group && groups.group.description}</p>
                      <span style={{cursor: "pointer"}} className="members" id="modalBtn" onClick={this.changeModalState}> Liczba członków: {groups.group.numberOfUsers} </span>

                      <Modal
                        open={this.state.openUsersList}
                        onClose={this.changeModalState}
                        center
                      >
                        <UsersList users={groups.group.users}/>
                      </Modal>

                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-12">
                      <span><Link className="check-mail-content-link-l" to={"/userProfile/" + groups.group.userId}>{isAdmin ? (<div>Jestes adminem</div>) : (<div>administrator</div>)}</Link></span>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" >
                <div className="col-md-8 offset-md-4 ">
                  <div className="btn-group dropright">
                    <button type="button" className="btn btn-secondary dropdown-toggle" id="dropRightEvents" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Wydarzenia Grupy
                    </button>
                    <div className="dropdown-menu">
                      <div className="dropdown-item">Zobacz istniejące wydarzenia</div>
                      <div className="dropdown-item">Utwórz nowe wydarzenie</div>
                    </div>
                  </div>
                  {userInGroup && !isAdmin ? 
                  ( 
                    <div className="btn-group dropright">
                      <button type="button" className="btn btn-secondary dropdown-toggle" id="dropRightExit" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-sign-out-alt"></i>
                      </button>
                      <div className="dropdown-menu">
                        <button type="button" onClick={this.leaveGroup} className="dropdown-item pointer-hand">Opuść grupę</button>
                      </div>
                    </div>
                  ) : 
                  (
                    <div>
                    {!isAdmin && <div className="btn">
                    <button type="button" className="btn btn-secondary join-group-btn" onClick={this.joinGroup}>Dołącz do grupy</button>
                  </div>}</div>
                  
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

        <div className="row">
          <div className="col-md-11 content profile-changes">
            <h1> Posty</h1>
            <hr />
            <div className="row margin-post ">
              <div className="col-md-8 offset-md-2">
                <form onSubmit={this.handleSubmit}>
                  <div className={'form-group interest-content ' + validation.postContent.isInvalid && ' has-error'}>
                    <textarea className="form-control" rows="3" name="postContent" placeholder="Napisz post" onChange={this.handleChange}></textarea>
                    <span className="help-block">{validation.postContent.message}</span>
                    {userInGroup || isAdmin ? (<button type="submit" className="btn btn-secondary" id="submitPost">Dodaj Post {posts.loading ?
                      (<img alt="spinner" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />) : (<div></div>)
                    }</button>) : (<div>W celu dodania postu należy dołączyć do grupy</div>)}
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

            <PostsList posts={this.props.posts.posts} groupId={this.props.id} isAdmin={isAdmin} userInGroup={userInGroup}/>

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
