import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QUESTIONS_AMOUNT } from '../app.module';
import { Question } from './question/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(
    private http: HttpClient,
    @Inject(QUESTIONS_AMOUNT) private amount: number
  ) {}

  fetchQuestions(): Observable<Question[]> {
    return this.http
      .get<{ results: Question[] }>(
        `https://opentdb.com/api.php?amount=${this.amount}&encode=base64&type=multiple`
      )
      .pipe(map((response: { results: Question[] }) => response.results));
  }
}
