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
                </div>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
