import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const NEXT_PHRASE = 'NEXT_PHRASE';
export const ADD_SCORE = 'ADD_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

const randomIntInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

@Injectable()
export class PracticeActions {
  constructor(private redux: NgRedux<any>) {}

  nextPhrase() {
    const state = this.redux.getState();
    const numPhrases = state.phrases.length;
    const currentStage = state.practice.stage;

    let nextStage;
    do {
      nextStage = randomIntInRange(0, numPhrases - 1);
    } while (nextStage === currentStage);

    this.redux.dispatch({ type: NEXT_PHRASE, stage: nextStage });
  }

  addScore(num) {
    this.redux.dispatch({ type: ADD_SCORE, score: num });
  }

  resetScore() {
    this.redux.dispatch({ type: RESET_SCORE });
  }
}
