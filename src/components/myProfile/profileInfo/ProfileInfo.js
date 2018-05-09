import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../../actions';
import { Link } from 'react-router-dom';

class ProfileInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.dispatch(userActions.getLoggedUser());
    this.setState({isLoading:false});
  }

  render() {
    const { loggedUser } = this.props;

    return (
        <div class="col-md-9 content profile-changes">
            <h1> Mój profil </h1>
            <hr />
            <div class="row profile-changes">
                <div class="col-md-4">
                    <img src="/images/profilePhoto.jpg" class="profile-photo" />
                </div>
                <div class="col-md-8 ">
                    <div class="row">
                        <div class="col-md-12 name  ">
                            <p id="name">{loggedUser.loggedUserData && loggedUser.loggedUserData.name} {loggedUser.loggedUserData && loggedUser.loggedUserData.surname}</p>
                            <hr />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <span>adres e-mail: <a href="#" id="email">{loggedUser.loggedUserData && loggedUser.loggedUserData.email}</a></span>
                            <hr />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                             <Link to="/changeAvatar"><button type="button" class="btn btn-secondary">Zmień Avatar</button></Link>
                            <Link to="/changePassword"><button type="button" class="btn btn-secondary">Zmień Hasło</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    const { loggedUser } = state;
    return {
        loggedUser
    };
}

const connectedProfileInfo = connect(mapStateToProps)(ProfileInfo);
export { connectedProfileInfo as ProfileInfo };



