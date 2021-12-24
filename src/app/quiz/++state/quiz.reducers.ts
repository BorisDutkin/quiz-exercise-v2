import { createFeature, createReducer, on } from '@ngrx/store';

import { Question } from '../question/question.model';
import { fetchQuestions, increaseCorrect, setIndex } from './quiz.actions';

export interface QuizState {
  questions: ReadonlyArray<Question>;
  correct: number;
  index: number;
}

export const initialState: QuizState = {
  questions: [],
  correct: 0,
  index: 0,
};

export const quizFeature = createFeature({
  name: 'quiz',
  reducer: createReducer(
    initialState,
    on(fetchQuestions, (state, { questions }) => ({
      ...state,
      questions,
    })),
    on(setIndex, (state, { index }) => ({
      ...state,
      index,
    })),
    on(increaseCorrect, (state) => ({
      ...state,
      correct: state.correct + 1,
    }))
  ),
});

export const {
  name,
  reducer,
  selectQuestions,
  selectCorrect,
  selectIndex,
  selectQuizState,
} = quizFeature;
