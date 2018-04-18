import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavigationBar.css';
import { userActions } from '../../../actions';
import logo from '../../../images/logo.png';
import avatar from '../../../images/av.jpg';

class NavigationBar extends React.Component {

  /*
  componentDidMount() {
    const { user } = this.props;
    if(user)
    {
      this.props.dispatch(userActions.getUser(this.props.user.clientId));
    }
  }
  */

  constructor(props) {
      super(props);
    }

  render() {
    const { loggedIn } = this.props;
    const { user } = this.props;
    const { loggedUser } = this.props;

    const userLinks = (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
     <div className="container">
        <a className="navbar-brand"><Link to="/"><img src={logo} /></Link></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
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
            <a href="profile.html"> <li className="nav-item"><img src={avatar} className="avatar"/></li></a>
            <li className="nav-item">
            <h7>Witaj, {loggedUser.userData && loggedUser.userData.name}</h7><br></br>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Moje konto
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item"><Link to="/login">Wyloguj się</Link></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    	</div>
    </nav>
    );

    const guestLinks = (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light ">
    <div className="container">
          <a className="navbar-brand" href=""><Link to="/"><img src={logo} /></Link></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <a className="nav-link" href="login"><button type="button" className="btn btn-secondary">Zaloguj się</button></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="register"><button type="button" className="btn btn-secondary">Zarejestruj się</button></a>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0 " >
      <input type="text" className="form-control" placeholder="Wyszukaj" aria-label="" aria-describedby="basic-addon1" />
      <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
    </div>
  </div>
  </nav>
    );

    return(
      <div>
        { loggedIn ? userLinks : guestLinks}
      </div>
    );
  }
}


function mapStateToProps(state) {
    const { loggedIn, user } = state.authentication;
    const { loggedUser } = state;
    return {
        loggedIn,
        user,
        loggedUser
    };
}

const connectedNavigationBar = connect(mapStateToProps)(NavigationBar);
export { connectedNavigationBar as NavigationBar };
