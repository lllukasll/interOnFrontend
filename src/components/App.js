import React from 'react';
import { NavigationBar } from './common/navigationBar/NavigationBar.js';
import { HomePage } from '../components/home';
import { LoginPage } from '../components/login';
import { RegisterPage } from '../components/register';
import  CheckMail  from '../components/register/CheckMail';
import { MainCategories } from '../components/mainCategories/MainCategories';
import { SubCategories } from '../components/subCategories/SubCategories';
import { Groups } from '../components/groups/Groups';
import { Group } from '../components/groups/Group';
import { CreateGroup } from '../components/groups/CreateGroup';
import { EditGroup } from '../components/groups/EditGroup';
import { MyProfile } from '../components/myProfile/MyProfile';
import { UserProfile } from '../components/userProfile/UserProfile';
import { ChangePassword } from '../components/myProfile/profileInfo/changePassword/ChangePassword';
import { ChangeAvatar } from '../components/myProfile/profileInfo/changeAvatar/ChangeAvatar';
import { CreateSubcategory} from '../components/subCategories/createSubcategory/CreateSubcategory';
import { CreateMainCategory} from '../components/mainCategories/createMainCategory/CreateMainCategory';
import Event from '../components/events/event/EventPage';
import EventsList from '../components/events/eventsList/EventsListPage';
import CreateEventPage from '../components/events/createEvent/CreateEventPage';
import FriendsPage from '../components/friends/FriendsPage';
import GroupsForUserPage from '../components/groups/GroupsForUserPage';
import MapContainer from '../components/map/MapContainer';
import ChatPage from '../components/chat/chatPage/ChatPage';
import {history} from '../helpers'

import {Router, Route} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
          <Router history={history}>
            <div>
              <NavigationBar />
                <div>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/mainCategories" component={MainCategories} />
                <Route path="/subCategories/:id" component={SubCategories} />
                <Route path="/groups" component={Groups} />
                <Route path="/group/:id" component={Group} />
                <Route path="/createGroup" component={CreateGroup} />
                <Route path="/editGroup/:id" component={EditGroup} />
                <Route path="/myProfile" component={MyProfile} />
                <Route path="/changePassword" component={ChangePassword} />
                <Route path="/userProfile/:id" component={UserProfile} />
                <Route path="/createSubcategory" component={CreateSubcategory} />
                <Route path="/createMainCategory" component={CreateMainCategory} />
                <Route path="/changeAvatar" component={ChangeAvatar} />
                <Route path="/checkMail" component={CheckMail} />
                <Route path="/event/:id" component={Event} />
                <Route path="/events" component={EventsList} />
                <Route path="/createEvent" component={CreateEventPage} />
                <Route path="/maptest" component={MapContainer} />
                <Route path="/friends" component={FriendsPage} />
                <Route path="/myGroups" component={GroupsForUserPage} />
                <Route path="/chatPage" component={ChatPage} />
                </div>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
