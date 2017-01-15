import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';

import { AppComponent } from './app.component';
import { TypingComponent } from './typing/typing.component';

import rootReducer from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    TypingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<any>,
    private devTools: DevToolsExtension
  ) {
    let enhancers = [];
    // add enhancers here

    // if (__DEVMODE__ && devTools.isEnabled()) {
      enhancers = [ ...enhancers, devTools.enhancer() ];
    // }

    const initialState = {};

    this.ngRedux.configureStore(
      rootReducer,
      initialState,
      [],
      enhancers);
  }
}
