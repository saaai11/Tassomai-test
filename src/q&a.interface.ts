export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  answerIndex: number;
}
export interface Answer {
  text: string;
  index: number;
}

export interface Answering {
  questionId: number;
  answerIndex: number;
}

interface Quiz {
  id: number;
  questions: Question[];
}
