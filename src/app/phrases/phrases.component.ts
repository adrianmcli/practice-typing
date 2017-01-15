import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

import { PhrasesActions } from './phrases-actions';

@Component({
  selector: 'app-phrases',
  providers: [ PhrasesActions ],
  template: `
    <h2>Add Phrase</h2>
    <input
      type="text"
      (keypress)="handleKeypress($event)"
      />
    <div *ngFor="let phrase of phrases$ | async">
      {{ phrase }}
    </div>
  `,
  styles: []
})
export class PhrasesComponent implements OnInit {

  @select('phrases') phrases$: Observable<string[]>;

  handleKeypress(e) {
    if (e.code === `Enter`) {
      this.actions.addPhrase(e.target.value);
      e.target.value = ``;
    }
  }

  constructor(
    public actions: PhrasesActions,
  ) { }

  ngOnInit() {
  }

}
