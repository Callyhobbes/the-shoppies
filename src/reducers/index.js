import counterReducer from './counter.js';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  counter: counterReducer
});

export default allReducers;