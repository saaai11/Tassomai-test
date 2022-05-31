import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Answering, Question } from 'src/q&a.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  url: string = 'http://localhost:3000/questions';
  answerUrl: string = 'http://localhost:3000/answers';

  quizId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private httpClient: HttpClient
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.quizId = +params.get('id');
    });
  }
  public getQuestion(id: number): Observable<Question> {
    return this.httpClient
      .get<Question>(`${this.url}/${id}`, {
        headers: { Accept: 'application/json' },
        params: {},
      })
      .pipe(map((response) => response));
  }

  public getQuestions(): Observable<Question[]> {
    return this.httpClient
      .get<Question[]>(`${this.url}`, {
        headers: { Accept: 'application/json' },
        params: {},
      })
      .pipe(map((response) => response));
  }

  public PostQuestions(answer: Answering, questionNumber: number) {
    console.log(questionNumber % 3, '33');
    if (questionNumber % 3 == 0) {
      this.answerUrl = 'http://localhost:3000/answers';

      console.log(`${this.answerUrl}`, 'postQuestion');

      return this.httpClient
        .post<any>(`${this.answerUrl}`, questionNumber)
        .pipe(
          map((response) => {
            return response;
          }),
          catchError((error) => {
            console.log(error, 'ees');
            return of(error);
          })
        );
    } else {
      console.log(`${this.answerUrl}`, 'postQuestion');

      return this.httpClient.post<any>(`${this.answerUrl}`, answer).pipe(
        map((response) => {
          console.log(response, 'ees');
          return response;
        })
      );
    }
  }

  navigateToNextQuestion() {
    this.quizId = this.quizId + 1;
    console.log(this.quizId, 'ide');
    this.router.navigate(['/quiz', this.quizId]).then();
    //this.resetAll();
  }
  resetAll() {
    this.quizId = 0;
  }
}
