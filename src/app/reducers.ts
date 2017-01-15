import { combineReducers } from 'redux';
import typing from './typing/typing-reducers';
import phrases from './phrases/phrases-reducers';

export default combineReducers({
  typing,
  phrases,
});
