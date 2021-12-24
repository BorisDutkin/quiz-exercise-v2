import { createSelector } from '@ngrx/store';
import { selectIndex, selectQuestions } from './quiz.reducers';

export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectIndex,
  (questions, index) => {
    return questions[index];
  }
);
