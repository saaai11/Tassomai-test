import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Answering } from 'src/q&a.interface';
import { Question } from './quiz.model';

export const loadQuestion = createAction(
  '[Quiz] Load Quiz Question',
  props<{ id: number }>()
);

export const loadQuestionSuccess = createAction(
  '[Quiz] Load Quiz Question Success',
  props<{ question: Question }>()
);

export const loadQuestions = createAction('[Quiz] Load Quiz Questions');

export const loadQuestionsSuccess = createAction(
  '[Quiz] Load Quiz Questions Success',
  props<{ questions: Question[] }>()
);

export const postAnswer = createAction(
  '[Quiz] Post Quiz Answers',
  props<{ answer: Answering; questionNumber: number }>()
);

export const postAnswerSuccess = createAction(
  '[Quiz] Post Quiz Answers Success',
  props<{ questions: Question[] }>()
);

export const postAnswerFailure = createAction(
  '[Quiz] Post Quiz Answers Failure'
);

export const loadFailedQuestions = createAction('[Quiz] Post Quiz Answers');

export const loadFailedQuestionsSuccess = createAction(
  '[Quiz] Post Quiz Answers Success',
  props<{ failedQuestions: Question[] }>()
);
