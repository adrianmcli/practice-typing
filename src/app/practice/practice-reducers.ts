import { NEXT_PHRASE } from './practice-actions';

const initialState = {
  stage: 0,
  score: 0,
};

export default function practice(state = initialState, action) {
  switch (action.type) {
    case NEXT_PHRASE:
      const newStageState = { stage: action.stage };
      return Object.assign({}, state, newStageState);
    default:
      return state;
  }
}
