import counterReducer from './counter.js';
import toggleReducer from './toggleModal.js';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  counter: counterReducer,
  modal: toggleReducer
});

export default allReducers;