import counterReducer from './counter.js';
import toggleReducer from './toggleModal.js';
import toggleRedirect from './toggleRedirect.js';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  counter: counterReducer,
  modal: toggleReducer,
  redirect: toggleRedirect
});

export default allReducers;