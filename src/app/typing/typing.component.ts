import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typing',
  template: `
    <div>{{phrase}}</div>
    <input type="text" [(ngModel)]="typedPhrase"/>
    <div>{{typedPhrase}}</div>
  `,
  styles: []
})
export class TypingComponent implements OnInit {

  phrase: string;
  typedPhrase: string;

  constructor() {
    this.phrase = `git commit -m "hello world"`;
    this.typedPhrase = `hey there`;
  }

  ngOnInit() {
  }

}
