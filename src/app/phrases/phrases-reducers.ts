import { ADD_PHRASE } from './phrases-actions';

export default function phrases(state = ['one', 'two', 'three'], action) {
  switch (action.type) {
    case ADD_PHRASE:
      return state.concat([action.phrase]);
    default:
      return state;
  }
}
