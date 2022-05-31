import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { QuizComponent } from './quiz.component';

fdescribe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let store: MockStore;
  const initialState = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check if content is present in header', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('.content');
    expect(element.textContent).not.toBeNull();
  });
  it('should check if content is showing true in header', () => {
    const element =
      fixture.debugElement.nativeElement.querySelector('.content');
    console.log(element.textContent, 'lkjhgfdfghjklkjhg');
    expect(element.textContent).toEqual('The quiz contains 8 questions');
  });
});
