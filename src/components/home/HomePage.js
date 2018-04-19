import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import SideBar from '../common/sideBar/SideBar';
import Interests from './interests/Interests';
import PopularGroups from './popularGroups/PopularGroups';
import UpcomingEvents from './upcomingEvents/UpcomingEvents';
import LoggedInterests from './interests/LoggedInterests';
import LoggedPopularGroups from './popularGroups/LoggedPopularGroups';
import LoggedUpcomingEvents from './upcomingEvents/LoggedUpcomingEvents';

class HomePage extends React.Component {
  render() {
      const { loggedIn } = this.props;

      const userContent = (
        <section className="container">
          <div className="row ">

            <SideBar />

            <LoggedInterests />

          </div>

            <LoggedPopularGroups />

            <LoggedUpcomingEvents />
        </section>
      );

      const guestContent = (
        <section className="container">
          <div className="row ">
            <Interests />
          </div>
          <PopularGroups />

          <UpcomingEvents />

        </section>
      );

       return (
         <div>
           { loggedIn ? userContent : guestContent}

         </div>
     );
   }
}

function mapStateToProps(state) {
    const { loggedUser, users, authentication } = state;
    const { loggedIn } = state.authentication;
    const { user } = authentication;
    return {
        user,
        users,
        loggedUser,
        loggedIn
    };
}
/*
const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: dispatch(userActions.getAll()),
    getUserById: userId => dispatch(userActions.getUser(userId))
  };
};
*/
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
