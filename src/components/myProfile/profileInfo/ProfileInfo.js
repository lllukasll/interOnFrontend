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
        <div className="col-md-9 content profile-changes">
            <h1> Mój profil </h1>
            <hr />
            <div className="row profile-changes">
                <div className="col-md-4">
                    <img alt="avatar" src="/images/profilePhoto.jpg" className="profile-photo" />
                </div>
                <div className="col-md-8 ">
                    <div className="row">
                        <div className="col-md-12 name  ">
                            <p id="name">{loggedUser.loggedUserData && loggedUser.loggedUserData.name} {loggedUser.loggedUserData && loggedUser.loggedUserData.surname}</p>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <span>adres e-mail:{loggedUser.loggedUserData && loggedUser.loggedUserData.email}</span>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                             <Link to="/changeAvatar"><button type="button" className="btn btn-secondary">Zmień Avatar</button></Link>
                            <Link to="/changePassword"><button type="button" className="btn btn-secondary">Zmień Hasło</button></Link>
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



