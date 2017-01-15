import { ADD_PHRASE } from './phrase-actions';

export default function phrases(state = ['git status'], action) {
  switch (action.type) {
    case ADD_PHRASE:
      console.log('add', action);
      return state.concat([action.phrase]);
    default:
      return state;
  }
}
