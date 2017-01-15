import { Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { PhraseActions } from './phrase-actions';

// TODO - use SM2 algo to choose what phrase to show next:
//        https://www.supermemo.com/english/ol/sm2.htm
// TODO - use Damerau-Levenshtein distance to calculate/indicator/quantify
//        typing inaccuracy:
//        http://stackoverflow.com/questions/41601087/what-string-distance-algorithm-is-best-for-measuring-typing-accuracy

@Component({
  selector: 'app-typing',
  providers: [ PhraseActions ],
  template: `
    <h2>Add Phrase</h2>
    <input
      type="text"
      (keypress)="handleKeypress2($event)"
      />
    <h2>List of Phrases</h2>
    <div *ngFor="let phrase of phrases$ | async">
      {{ phrase }}
    </div>
    <h2>Practice</h2>
    <button
      *ngIf="typingStart === false"
      (click)="startTypingGame()"
      >
      Start
    </button>
    <div>{{ getPhrase() }}</div>
    <input
      type="text"\
      [(ngModel)]="typedPhrase"
      (keypress)="handleKeypress($event)"
      />
    <div class="result" [class.valid]="isCorrect()">{{ typedPhrase }}</div>
  `,
  styles: [`
    .result {
      color: red;
    }
    .result.valid {
      color: green;
    }
  `]
})
export class TypingComponent implements OnInit {

  phrases: string[];
  phraseIndex: number;
  typedPhrase: string;
  typingStart: boolean;

  @select('phrase') phrases$: Observable<string[]>;

  constructor(
    public phraseActions: PhraseActions,
  ) {
    this.phraseIndex = 0;
    this.typedPhrase = `type the above string`;
    this.typingStart = false;
  }

  startTypingGame() {
    this.typingStart = true;
    setTimeout(() => {
      this.typingStart = false;
    }, 2000);
  }

  getPhrase() {
    return this.phrases[this.phraseIndex];
  }

  handleKeypress2(e) {
    if (e.code === `Enter`) {
      console.log('adding phrase');
      this.phraseActions.addPhrase(e.target.value);
      e.target.value = ``;
    }
  }

  handleKeypress(e) {
    if (e.code === `Enter`) {
      const i = this.phraseIndex;
      const { phrases } = this;
      const indexAtLastItem = i >= phrases.length - 1;

      if (indexAtLastItem) {
        this.phraseIndex = 0;
      } else {
        this.phraseIndex = i + 1;
      }
      this.typedPhrase = ``;
    }
  }

  isCorrect() {
    return this.getPhrase() === this.typedPhrase;
  }

  ngOnInit() {
    this.phrases$.subscribe((data) => {
      this.phrases = data;
    });
  }

}
