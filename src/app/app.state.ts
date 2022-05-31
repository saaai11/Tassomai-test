import { quizReducer } from './store/quiz.reducer';

export interface AppState {}

export const appReducer = {
  quiz: quizReducer,
};
