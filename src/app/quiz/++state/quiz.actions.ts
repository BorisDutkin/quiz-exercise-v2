import { createAction, props } from '@ngrx/store';

import { Question } from '../question/question.model';

export enum QuestionActions {
  Set = '[Questions API] Set Questions',
  Fetch = '[Questions API] Fetch Questions',
}

export enum IndexActions {
  Set = '[Index] Set Index',
}

export enum CorrectActions {
  Increase = '[Correct] Increase',
}

export const fetchQuestions = createAction(
  QuestionActions.Set,
  props<{ questions: Question[] }>()
);

export const setIndex = createAction(
  IndexActions.Set,
  props<{ index: number }>()
);

export const increaseCorrect = createAction(CorrectActions.Increase);
