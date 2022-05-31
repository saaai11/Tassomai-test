import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { QuestionsComponent } from './questions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Answer } from 'src/q&a.interface';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsComponent],
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;

    component.questionsList = [
      {
        id: 1,
        text: 'What is .subscribe',
        answers: [
          'Both',
          'Streams data asynchronously',
          'Streams data synchronously',
          'None',
        ],
        answerIndex: 0,
      },
      {
        id: 2,
        text: 'Which keyword allows us to share information between files in TypeScript?',
        answers: ['export', 'import', 'aync', 'constructor'],
        answerIndex: 0,
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if question is present in container', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('.question');

    expect(element.textContent).not.toBeNull();
  });

  it('should check if question is showing true in header', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('.question');
    expect(element.textContent).toEqual('What is .subscribe');
  });

  it('should check if option is showing up', () => {
    const element = fixture.debugElement.nativeElement.querySelector('.option');
    expect(element.textContent).not.toBeNull();
  });

  it('check if router has been navigated', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.restart();
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('check if open snack bar has been called', () => {
    const routerSpy = spyOn(component, 'openSnackBar');
    component.checkAnswer(1, 1);
    fixture.detectChanges();
    expect(routerSpy).toHaveBeenCalled();
  });
});
