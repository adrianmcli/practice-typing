import { ADD_PHRASE, REMOVE_PHRASE } from './phrases-actions';

export default function phrases(state = ['one', 'two', 'three'], action) {
  switch (action.type) {
    case ADD_PHRASE:
      return state.concat([action.phrase]);
    case REMOVE_PHRASE:
      return state.filter((x, i) => i !== action.index);
    default:
      return state;
  }
}
