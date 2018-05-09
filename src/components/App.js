import React from 'react';
import PropTypes from 'prop-types';
import { NavigationBar } from './common/navigationBar/NavigationBar.js';
import { HomePage } from '../components/home';
import { LoginPage } from '../components/login';
import { RegisterPage } from '../components/register';
import { MainCategories } from '../components/mainCategories/MainCategories';
import { SubCategories } from '../components/subCategories/SubCategories';
import { Groups } from '../components/groups/Groups';
import { Group } from '../components/groups/Group';
import { CreateGroup } from '../components/groups/CreateGroup';
import { MyProfile } from '../components/myProfile/MyProfile';
import { UserProfile } from '../components/userProfile/UserProfile';
import { ChangePassword } from '../components/myProfile/profileInfo/changePassword/ChangePassword';
import { ChangeAvatar } from '../components/myProfile/profileInfo/changeAvatar/ChangeAvatar';
import { CreateSubcategory} from '../components/subCategories/createSubcategory/CreateSubcategory';
import { CreateMainCategory} from '../components/mainCategories/createMainCategory/CreateMainCategory';
import {history} from '../helpers'

import {connect} from 'react-redux';

import {
  Router,
  Route,
  Link
} from 'react-router-dom';

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
                <Route path="/myProfile" component={MyProfile} />
                <Route path="/changePassword" component={ChangePassword} />
                <Route path="/userProfile/:id" component={UserProfile} />
                <Route path="/createSubcategory" component={CreateSubcategory} />
                <Route path="/createMainCategory" component={CreateMainCategory} />
                <Route path="/changeAvatar" component={ChangeAvatar} />
                </div>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
