import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Answer, Question } from './question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnChanges {
  @Input() question!: Question | null;
  @Input() countdown: number = 0;
  @Output() strike: EventEmitter<boolean> = new EventEmitter();

  answers: Answer[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question && changes.question.currentValue) {
      const question = changes.question.currentValue;

      this.answers = this.shuffleArray([
        {
          answer: question.correct_answer,
          correct: true,
        },
        ...question.incorrect_answers.map((answer: string) => ({
          answer,
          correct: false,
        })),
      ]);
    }
  }

  onStrike(answer: Answer) {
    this.strike.emit(answer.correct);
  }

  private shuffleArray(array: Answer[]): Answer[] {
    let copy = array.slice();

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }
}
