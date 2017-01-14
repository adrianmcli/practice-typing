import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typing',
  template: `
    <div>{{phrase}}</div>
    <input type="text" [(ngModel)]="typedPhrase"/>
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

  phrase: string;
  typedPhrase: string;

  constructor() {
    this.phrase = `git commit -m "hello world"`;
    this.typedPhrase = `type the above string`;
  }

  isCorrect() {
    return this.phrase === this.typedPhrase;
  }

  ngOnInit() {
  }

}
