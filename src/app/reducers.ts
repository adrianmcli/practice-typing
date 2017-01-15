import { combineReducers } from 'redux';
import typing from './typing/typing-reducers';
import phrase from './typing/phrase-reducers';

export default combineReducers({
  typing,
  phrase,
});
