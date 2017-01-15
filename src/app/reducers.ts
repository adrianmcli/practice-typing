import { combineReducers } from 'redux';
import phrases from './phrases/phrases-reducers';
import practice from './practice/practice-reducers';

export default combineReducers({
  phrases,
  practice,
});
