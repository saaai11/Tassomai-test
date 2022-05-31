import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { QuizService } from './quiz.service';

xdescribe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [provideMockStore({ initialState: {} }), QuizService],
    });
    service = TestBed.inject(QuizService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created service', () => {
    const dummyResponse = [
      {
        data: [
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
        ],
      },
    ];
    service.getQuestions().subscribe((res) => {
      expect(res).not.toBeNull();
      const req = httpMock.expectOne('http://localhost:3000/questions');
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });
});
