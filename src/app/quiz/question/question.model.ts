export interface Question {
  question: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Answer {
  answer: string;
  correct: boolean;
}
