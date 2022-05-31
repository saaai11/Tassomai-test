import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { QuizService } from 'src/app/services/quiz.service';
import {
  loadFailedQuestions,
  loadQuestion,
  loadQuestions,
  postAnswer,
} from 'src/app/store/quiz.actions';
import {
  fetchScore,
  getQuestion,
  getQuestions,
  isFailure,
  loadFailQuestions,
} from 'src/app/store/quiz.selectors';
import { Answering, Question } from 'src/q&a.interface';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  id: number;
  questions$: Observable<Question[]> = this.store.pipe(select(getQuestions));
  failedquestions$: Observable<Question[]> = this.store.pipe(
    select(loadFailQuestions)
  );
  fetchScore$: Observable<number> = this.store.pipe(select(fetchScore));

  currentQuestion: number = 0;
  questionsList: Question[] = [];
  failedquestions: Question[] = [];
  public score: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.id = +params.get('id');
    //   this.store.dispatch(loadQuestion({ id: this.id }));
    // });
  }

  ngOnInit(): void {
    this.store.dispatch(loadQuestions());
    this.store.dispatch(loadFailedQuestions());

    this.getQuestions();
    this.failedquestions$.subscribe((questions: Question[]) => {
      this.failedquestions = questions;
    });
  }

  getQuestions() {
    this.questions$.subscribe((questions) => {
      this.questionsList = questions;
    });
  }

  openSnackBar(index: number, questionId: number) {
    let isFailure$ = this.store.pipe(select(isFailure));
    let message;

    setTimeout(() => {
      isFailure$.subscribe((answer) => {
        if (answer == true) {
          if (index === this.questionsList[questionId].answerIndex) {
            message = 'The answer is correct!!';
          } else {
            message = 'Wrong answer';
          }

          this.snackBar.open(message, null, {
            panelClass: 'success',
          });
        }
      });
    }, 500);

    this.currentQuestion++;
  }

  checkAnswer(index: number, questionId: number) {
    let answer: Answering = {
      questionId: questionId,
      answerIndex: index,
    };

    this.store.dispatch(
      postAnswer({
        answer: answer,
        questionNumber: questionId,
      })
    );

    this.openSnackBar(index, questionId);
  }
  restart() {
    this.router.navigate(['./quiz']);
  }
}
