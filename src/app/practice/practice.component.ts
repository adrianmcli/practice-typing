import { Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs';

import { PracticeActions } from './practice-actions';

@Component({
  selector: 'app-practice',
  providers: [ PracticeActions ],
  template: `
    <h2>Practice Typing!</h2>
    <div [ngSwitch]="phrasesExist()">
      <div *ngSwitchCase="true">
        <h3>Current Score: {{ score$ | async }}</h3>
        <div>{{ targetPhrase }}</div>
        <input
          class="input"
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
      </div>
      <div *ngSwitchDefault>
        <h1>Please add a phrase to the left</h1>
      </div>
    </div>
  `,
  styles: [`
    .input {
      font-size: 24px;
      margin: 20px 0;
      padding: 10px 6px;
    }
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
    if (e.keyCode === 13) {
      const score = this.isCorrect() ? 1 : 0;
      this.actions.addScore(score);
      this.actions.nextPhrase();
      this.typedPhrase = ``;
    }
  }

  phrasesExist() {
    return Boolean(this.targetPhrase) === true;
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
