import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App.js';
import {HomePage} from './components/home';
import {LoginPage} from './components/login/LoginPage';
import {RegisterPage} from './components/register/RegisterPage';

export default (
  <div>
  <Route exact path="/" component={HomePage} />
  <Route path="/login" component={LoginPage} />
  <Route path="/register" component={RegisterPage} />
  </div>
);
