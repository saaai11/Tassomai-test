import { createReducer, on } from '@ngrx/store';
import { Answer, Answering } from 'src/q&a.interface';
import {
  loadQuestion,
  loadQuestions,
  loadQuestionsSuccess,
  loadQuestionSuccess,
  postAnswer,
  postAnswerFailure,
  postAnswerSuccess,
} from './quiz.actions';
import { Question } from './quiz.model';

export interface State {
  question: Question;
  questions: Question[];
  answer: Answering;
  currentQuestion: number;
  failedQuestions: Question[];
  isFailure: boolean;
  score: number;
}

export const initialState: State = {
  question: null,
  questions: [],
  answer: null,
  currentQuestion: 0,
  failedQuestions: [],
  isFailure: false,
  score: 0,
};

export const quizReducer = createReducer(
  initialState,
  on(loadQuestion, (state) => {
    return {
      ...state,
    };
  }),
  on(loadQuestionSuccess, (state, action) => {
    return {
      ...state,
      question: action.question,
    };
  }),
  on(loadQuestions, (state) => {
    return {
      ...state,
    };
  }),
  on(loadQuestionsSuccess, (state, action) => {
    console.log(action.questions, 'qsacts');
    return {
      ...state,
      questions: action.questions,
    };
  }),
  on(postAnswer, (state, action) => {
    // if(action.)

    return {
      ...state,
      currentQuestion: action.questionNumber,
      answer: action.answer,
    };
  }),
  on(postAnswerSuccess, (state, action) => {
    console.log(state.questions, 'qsacts');

    let newList = [...state.questions];
    let currentIndex = state.currentQuestion;

    console.log(state.answer, state.questions[currentIndex], 'aaaas');
    let updatedScore = state.score;
    if (state.answer) {
      if (
        state.answer.answerIndex === state.questions[currentIndex].answerIndex
      ) {
        updatedScore = updatedScore + 1;
      }
    }

    return {
      ...state,
      score: updatedScore,
      isFailure: true,
    };
  }),
  on(postAnswerFailure, (state) => {
    let newList = [...state.questions];
    let currentIndex = state.currentQuestion;
    let updatedScore = state.score;
    if (state.answer) {
      if (
        state.answer.answerIndex === state.questions[currentIndex].answerIndex
      ) {
        updatedScore = updatedScore - 1;
      }
    }
    console.log(currentIndex, 'curr');
    let item = newList.slice(currentIndex, currentIndex + 1);

    item.forEach((value) => {
      newList.splice(currentIndex + 2, 0, value);
    });

    console.log(newList, 'mewlist');

    return {
      ...state,
      questions: newList,
      isFailure: false,
    };
  })
);
