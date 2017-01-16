import { Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { PracticeActions } from './practice-actions';

@Component({
  selector: 'app-practice',
  providers: [ PracticeActions ],
  template: `
    <h2 class="title">Practice Typing!</h2>
    <div [ngSwitch]="showGame()">
      <div *ngSwitchCase="true" class="game-container">
        <h3>Current Score: {{ score$ | async }}</h3>
        <div *ngIf="!inputDisabled && !gameStarted">See how fast you can correctly type 10 phrases.<br />The timer starts when you begin typing.</div>
        <div *ngIf="gameStarted">The timer is running!</div>
        <div class="target-phrase">{{ targetPhrase }}</div>
        <input
          class="input"
          type="text"
          [(ngModel)]="typedPhrase"
          (keypress)="handleKeypress($event)"
          [placeholder]="inputDisabled ? 'Reset game to play again' : 'Type the above phrase and press Enter'"
          [disabled]="inputDisabled"
          />
        <div
          class="result"
          [class.valid]="isValid()"
          [class.correct]="isCorrect()"
          >{{ typedPhrase }}</div>
          <button
            *ngIf="inputDisabled"
            class="reset-btn"
            (click)="resetGame()"
            >
            Reset Game
          </button>
          <div>{{ victoryMessage }}</div>
      </div>
      <div *ngSwitchDefault>
        <h1>Please add at least two phrases to play.</h1>
      </div>
    </div>
  `,
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  typedPhrase: string;
  targetPhrase: string;
  numPhrases: number;
  gameStarted: boolean;
  gameStartTime: any;
  inputDisabled: boolean;
  victoryMessage: string;
  prevTime: number;

  @select(state => state.phrases.length) numPhrases$: Observable<number>;
  @select(state => state.phrases[state.practice.stage]) phrase$: Observable<string>;
  @select(['practice', 'score']) score$: Observable<number>;

  constructor(public actions: PracticeActions) {
    this.gameStarted = false;
    this.inputDisabled = false;
    this.victoryMessage = '';
  }

  getPrevTime() {
    if (this.prevTime) {
      return `Your previous time was ${this.prevTime} seconds.`;
    }
    return '';
  }

  handleKeypress(e) {
    // if game has not started, then start the game
    if (this.gameStarted === false) {
      this.gameStarted = true;
      this.gameStartTime = new Date();
    }
    if (e.keyCode === 13) {
      const score = this.isCorrect() ? 1 : 0;
      this.actions.addScore(score);
      this.actions.nextPhrase();
      this.typedPhrase = ``;
    }
  }

  resetGame() {
    this.gameStarted = false;
    this.inputDisabled = false;
    this.actions.resetScore();
    this.victoryMessage = this.getPrevTime();
  }

  showGame() {
    return this.numPhrases >= 2;
  }

  isValid() {
    return this.targetPhrase.includes(this.typedPhrase);
  }

  isCorrect() {
    return this.typedPhrase === this.targetPhrase;
  }

  ngOnInit() {
    this.phrase$.subscribe(phrase => this.targetPhrase = phrase);
    this.numPhrases$.subscribe(num => this.numPhrases = num);
    this.score$.subscribe(score => {
      if (score >= 10) {
        setTimeout(() => {
          this.gameStarted = false;
          const nowTime: any = new Date();
          const timeElapsed = nowTime - this.gameStartTime;
          this.victoryMessage = `Congrats, time elapsed: ${timeElapsed/1000} seconds`;
          this.prevTime = timeElapsed/1000;
          this.inputDisabled = true;
        }, 0);
      }
    });
  }

}
