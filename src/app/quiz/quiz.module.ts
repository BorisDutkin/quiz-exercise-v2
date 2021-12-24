import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CarouselModule } from 'primeng/carousel';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuestionComponent } from './question/question.component';
import { quizFeature } from './++state/quiz.reducers';
import { QuizEffects } from './++state/quiz.effects';
import { AtobPipe } from './question/question.pipe';

@NgModule({
  declarations: [QuizComponent, QuestionComponent, AtobPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    QuizRoutingModule,
    StoreModule.forFeature(quizFeature),
    EffectsModule.forFeature([QuizEffects]),
    CarouselModule,
  ],
})
export class QuizModule {}
