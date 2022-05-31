import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Question } from 'src/q&a.interface';
import { AppState } from '../app.state';
import { QuizService } from '../services/quiz.service';
import { loadQuestions } from '../store/quiz.actions';
import { getQuestions } from '../store/quiz.selectors';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private quizService: QuizService,
    private router: Router
  ) {}

  start() {
    this.router.navigate(['./quiz/questions']);
  }

  ngOnInit(): void {
    this.store.dispatch(loadQuestions());
  }
}
