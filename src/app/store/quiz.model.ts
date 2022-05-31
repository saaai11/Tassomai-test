export interface Question {
  id: number;
  text: string;
  answers: string[];
  answerIndex: number;
}

export interface Questions {
  questions: Question[];
}
export interface Answer {
  text: string;
  index: number;
}
