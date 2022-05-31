import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromQuiz from './quiz.reducer';

export const quizState = createFeatureSelector<fromQuiz.State>('quiz');

export const getQuestion = createSelector(quizState, (state) => {
  return state.question;
});

export const getQuestions = createSelector(quizState, (state) => {
  return state.questions;
});

export const loadFailQuestions = createSelector(quizState, (state) => {
  return state.failedQuestions;
});

export const fetchScore = createSelector(quizState, (state) => {
  return state.score;
});

export const isFailure = createSelector(quizState, (state) => {
  return state.isFailure;
});
