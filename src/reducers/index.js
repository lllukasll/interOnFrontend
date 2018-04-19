import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { loggedUser } from './user.reducer';
import { mainCategories } from './mainCategory.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  loggedUser,
  mainCategories,
  alert
});

export default rootReducer;
