import { NEXT_PHRASE, ADD_SCORE, RESET_SCORE } from './practice-actions';

const initialState = {
  stage: 0,
  score: 0,
};

export default function practice(state = initialState, action) {
  switch (action.type) {
    case NEXT_PHRASE:
      const newStageState = { stage: action.stage };
      return Object.assign({}, state, newStageState);
    case ADD_SCORE:
      const newScoreState = { score: state.score + action.score };
      return Object.assign({}, state, newScoreState);
    case RESET_SCORE:
      return Object.assign({}, state, { score: 0 });
    default:
      return state;
  }
}
