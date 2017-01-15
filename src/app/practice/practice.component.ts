import { Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

import { PracticeActions } from './practice-actions';

@Component({
  selector: 'app-practice',
  providers: [ PracticeActions ],
  template: `
    <h2>Practice Component</h2>
    <h3>Current Score: {{ score$ | async }}</h3>
    <div>{{ targetPhrase }}</div>
    <input
      type="text"
      [(ngModel)]="typedPhrase"
      (keypress)="handleKeypress($event)"
      />
    <div
      class="result"
      [class.valid]="isValid()"
      [class.correct]="isCorrect()"
      >
      {{ typedPhrase }}
    </div>
  `,
  styles: [`
    .result {
      color: red;
    }
    .result.valid {
      color: green;
    }
    .result.correct {
      color: white;
      background-color: green;
    }
  `]
})
export class PracticeComponent implements OnInit {

  typedPhrase: string;
  targetPhrase: string;

  @select(state => state.phrases[state.practice.stage]) phrase$: Observable<string>;
  @select(['practice', 'score']) score$: Observable<number>;

  constructor(public actions: PracticeActions) {
    this.typedPhrase = `type the above string`;
  }

  handleKeypress(e) {
    if (e.code === `Enter`) {
      const score = this.isCorrect() ? 1 : 0;
      this.actions.addScore(score);
      this.actions.nextPhrase();
      this.typedPhrase = ``;
    }
  }

  isValid() {
    return this.targetPhrase.includes(this.typedPhrase);
  }

  isCorrect() {
    return this.typedPhrase === this.targetPhrase;
  }

  ngOnInit() {
    this.phrase$.subscribe(phrase => this.targetPhrase = phrase);
  }

}
