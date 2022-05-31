import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { QuizService } from '../services/quiz.service';
import {
  loadQuestion,
  loadQuestions,
  loadQuestionsSuccess,
  loadQuestionSuccess,
  postAnswer,
  postAnswerFailure,
  postAnswerSuccess,
} from './quiz.actions';

@Injectable()
export class QuizEffects {
  constructor(private actions$: Actions, private quizService: QuizService) {}

  loadQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuestion),
      switchMap((action) => this.quizService.getQuestion(action.id)),
      map((response) => {
        return loadQuestionSuccess({ question: response });
      })
    );
  });

  loadQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuestions),
      switchMap(() => this.quizService.getQuestions()),
      map((response) => {
        return loadQuestionsSuccess({ questions: response });
      })
    );
  });

  postAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postAnswer),
      switchMap((action) => {
        return this.quizService.PostQuestions(
          action.answer,
          action.questionNumber
        );
      }),
      map((response) => {
        try {
          if (response.status == 400) {
            return postAnswerFailure();
          }

          return postAnswerSuccess({ questions: response });
        } catch (error) {
          return postAnswerFailure();
        }
      })
    );
  });
}
