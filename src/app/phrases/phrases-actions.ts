import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const ADD_PHRASE = 'ADD_PHRASE';

@Injectable()
export class PhrasesActions {
  constructor(private redux: NgRedux<any>) {}

  addPhrase(phrase) {
    console.log('dispatching:', phrase);
    this.redux.dispatch({
      type: ADD_PHRASE,
      phrase,
    })
  }
}
