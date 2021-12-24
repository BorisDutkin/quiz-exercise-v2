import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Carousel } from 'primeng/carousel';
import { Observable, timer, of, Subscription } from 'rxjs';
import { filter, map, scan, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { COUNTDOWN_SECONDS, QUESTIONS_AMOUNT } from '../app.module';

import {
  CorrectActions,
  QuestionActions,
  setIndex,
} from './++state/quiz.actions';
import { selectCurrentQuestion } from './++state/quiz.selectors';
import { Question } from './question/question.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  @ViewChild('carousel') carousel!: Carousel;

  question$: Observable<Question> = this.store
    .select(selectCurrentQuestion)
    .pipe(filter((question) => question !== undefined));

  questions$: Observable<Question[]> = this.store.select(
    (state) => state.quiz.questions
  );

  timer: number = 0;

  private timer$ = timer(0, 1000).pipe(
    scan((acc) => --acc, this.countdown + 1),
    takeWhile((x) => x >= 0)
  );

  private timerSubscription!: Subscription;
  private strikes: number = 0;

  constructor(
    private store: Store<{ quiz: { questions: Question[] } }>,
    @Inject(QUESTIONS_AMOUNT) private amount: number,
    @Inject(COUNTDOWN_SECONDS) private countdown: number
  ) {}

  ngOnInit(): void {
    this.store.dispatch({ type: QuestionActions.Fetch });

    this.timerSubscription = this.timer$.subscribe({
      next: (value) => (this.timer = value),
      complete: () => this.skip(),
    });
  }

  onStrike(correct: boolean): void {
    const page = this.carousel.page;

    if (correct && page < this.amount - 1) {
      this.store.dispatch({ type: CorrectActions.Increase });
      this.store.dispatch(setIndex({ index: page + 1 }));
      this.carousel.step(1, page + 1);
      this.strikes = 0;
    } else {
      this.strikes++;

      if (this.strikes === 3) {
        this.store.dispatch(setIndex({ index: this.carousel.page + 1 }));
        this.carousel.step(1, this.carousel.page + 1);
      }
    }
  }

  onChange(page: number): void {
    this.store.dispatch(setIndex({ index: page }));

    this.timerSubscription.unsubscribe();

    this.timerSubscription = this.timer$.subscribe({
      next: (value) => (this.timer = value),
      complete: () => this.skip(),
    });
  }

  private skip(): void {
    const page = this.carousel.page;

    if (page < this.amount - 1) {
      this.store.dispatch({ type: CorrectActions.Increase });
      this.store.dispatch(setIndex({ index: page + 1 }));
      this.carousel.step(1, page + 1);
      this.strikes = 0;
    }
  }
}
