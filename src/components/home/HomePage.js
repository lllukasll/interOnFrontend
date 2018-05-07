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
      const { alert } = this.props;

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
           
          {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
          }

          { loggedIn ? userContent : guestContent}

         </div>
     );
   }
}

function mapStateToProps(state) {
    const { loggedUser, users, authentication } = state;
    const { loggedIn } = state.authentication;
    const { user } = authentication;
    const { alert } = state;
    return {
        user,
        users,
        loggedUser,
        loggedIn,
        alert
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
