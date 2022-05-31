import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuizService } from '../services/quiz.service';
import { QuestionsComponent } from './questions/questions.component';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

@NgModule({
  declarations: [QuizComponent, QuestionsComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [
    QuizService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2000 } },
  ],
})
export class QuizModule {}
