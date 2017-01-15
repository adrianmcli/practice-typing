import { Component, OnInit } from '@angular/core';

// TODO - use SM2 algo to choose what phrase to show next:
//        https://www.supermemo.com/english/ol/sm2.htm
// TODO - use Damerau-Levenshtein distance to calculate/indicator/quantify
//        typing inaccuracy:
//        http://stackoverflow.com/questions/41601087/what-string-distance-algorithm-is-best-for-measuring-typing-accuracy

@Component({
  selector: 'app-typing',
  template: `
    <div>{{getPhrase()}}</div>
    <input
      type="text"\
      [(ngModel)]="typedPhrase"
      (keypress)="handleKeypress($event)"
      />
    <div class="result" [class.valid]="isCorrect()">{{typedPhrase}}</div>
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

  constructor() {
    this.phrases = [
      `git commit -m "hello world"`,
      `git status`,
    ];
    this.phraseIndex = 0;
    this.typedPhrase = `type the above string`;
  }

  getPhrase() {
    return this.phrases[this.phraseIndex];
  }

  handleKeypress(e) {
    if (e.code === `Enter`) {
      this.typedPhrase = ``;
      const i = this.phraseIndex;
      const { phrases } = this;
      const indexAtLastItem = i >= phrases.length - 1;

      if (indexAtLastItem) {
        this.phraseIndex = 0;
      } else {
        this.phraseIndex = i + 1;
      }
    }
  }

  isCorrect() {
    return this.getPhrase() === this.typedPhrase;
  }

  ngOnInit() {
  }

}
