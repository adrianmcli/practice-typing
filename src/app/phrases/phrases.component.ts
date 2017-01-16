import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

import { PhrasesActions } from './phrases-actions';

@Component({
  selector: 'app-phrases',
  providers: [ PhrasesActions ],
  template: `
    <h2>Phrases</h2>
    <input
      class="input"
      type="text"
      (keypress)="handleKeypress($event)"
      placeholder="Add your phrases here"
      />
    <div
      class="phrase"
      *ngFor="let phrase of phrases$ | async; let i = index"
      >
      <span>{{ phrase }}</span>
      <span
        class="delete-btn"
        (click)="delete(i)"
        >
        x
      </span>
    </div>
  `,
  styleUrls: ['./phrases.component.css']
})
export class PhrasesComponent implements OnInit {

  @select('phrases') phrases$: Observable<string[]>;

  handleKeypress(e) {
    if (e.keyCode === 13) {  // return key
      this.actions.addPhrase(e.target.value);
      e.target.value = ``;
    }
  }

  delete(index) {
    this.actions.removePhrase(index);
  }

  constructor(
    public actions: PhrasesActions,
  ) { }

  ngOnInit() {
  }

}
