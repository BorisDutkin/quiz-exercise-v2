import { EffectsModule } from '@ngrx/effects';
import { environment } from './../environments/environment';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export const QUESTIONS_AMOUNT = new InjectionToken<number>('');
export const COUNTDOWN_SECONDS = new InjectionToken<number>('');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: QUESTIONS_AMOUNT,
      useValue: 10,
    },
    {
      provide: COUNTDOWN_SECONDS,
      useValue: 20,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
