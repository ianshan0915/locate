import { combineReducers } from 'redux';
import articles from './reducers/articles';
import updates from './reducers/updates';
import authUser from './reducers/authUser';
import common from './reducers/common';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  articles,
  updates,
  authUser,
  common,
  router: routerReducer
});
