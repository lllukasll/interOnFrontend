import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class LoggedInContent extends React.Component {
  render() {
    const { loggedUser } = this.props;

    return (

      <div className="collapse navbar-collapse" id="navbarText">

        <ul className="navbar-nav mr-auto">
          <li>
            <form className="form-inline my-2 my-lg-0 " >
              <input type="text" className="form-control logged-search" placeholder="Wyszukaj" aria-label="" aria-describedby="basic-addon1"/>
              <button className="btn btn-outline-secondary my-2 my-sm-0 " type="submit">
              <i className="fa fa-search"></i>
              </button>
            </form>
          </li>
        </ul>

        <div>
          <ul className="navbar-nav mr-auto">
            <a href="profile.html"> <li className="nav-item"><img src="./images/av.jpg" className="avatar" alt="avatar"/></li></a>
            <li className="nav-item">
            <div>Witaj, {loggedUser.userData && loggedUser.userData.name}</div>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Moje konto
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link to="/login" className="dropdown-item">Wyloguj się</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
    const { loggedUser } = state;
    return {
        loggedUser
    };
}

const connectedLoggedInContent = connect(mapStateToProps)(LoggedInContent);
export { connectedLoggedInContent as LoggedInContent };
