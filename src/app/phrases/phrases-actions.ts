import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const ADD_PHRASE = 'ADD_PHRASE';
export const REMOVE_PHRASE = 'REMOVE_PHRASE';

@Injectable()
export class PhrasesActions {
  constructor(private redux: NgRedux<any>) {}

  addPhrase(phrase) {
    this.redux.dispatch({ type: ADD_PHRASE, phrase });
  }

  removePhrase(index) {
    this.redux.dispatch({ type: REMOVE_PHRASE, index });
  }
}
