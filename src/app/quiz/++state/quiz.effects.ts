import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { QuizService } from '../quiz.service';
import { QuestionActions } from './quiz.actions';

@Injectable()
export class QuizEffects {
  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.Fetch),
      mergeMap(() =>
        this.quizService.fetchQuestions().pipe(
          map((questions) => ({ type: QuestionActions.Set, questions })),
          catchError(() =>
            of({ type: '[Questions API] Question Loaded Error' })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private quizService: QuizService) {}
}
