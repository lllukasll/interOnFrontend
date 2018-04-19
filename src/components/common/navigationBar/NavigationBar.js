import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavigationBar.css';
import { userActions } from '../../../actions';
import {LoggedInContent} from './loggedInContent/LoggedInContent';
import GuestContent from './guestContent/GuestContent';

class NavigationBar extends React.Component {

  render() {
    const { loggedIn } = this.props;

    return(
      <div>
        <nav className="navbar sticky-top navbar-expand-lg navbar-light ">
          <div className="container">
            <Link to="/" className="navbar-brand" ><img src="/images/logo.png" /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            { loggedIn ? <LoggedInContent /> : <GuestContent />}

          </div>
        </nav>
      </div>
    );
  }
}


function mapStateToProps(state) {
    const { loggedIn} = state.authentication;
    return {
        loggedIn,
    };
}

const connectedNavigationBar = connect(mapStateToProps)(NavigationBar);
export { connectedNavigationBar as NavigationBar };
