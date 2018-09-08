import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TwitterComponent } from './twitter.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Tweet } from '../../models/tweets';
import { TestTweets } from '../../../testing/test-tweets';

describe('TwitterComponent', () => {
  let component: TwitterComponent;
  let fixture: ComponentFixture<TwitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule, NoopAnimationsModule],
      declarations: [TwitterComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TwitterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should test getSong and default values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component.tweets).toBeUndefined();

    const request = httpMock.expectOne('http://localhost:3000/api/twitter');
    expect(request.request.method).toEqual('GET');
    request.flush(TestTweets);

    expect(component.tweets).toEqual([
      <Tweet>{
        id: 1,
        created: 'now',
        tweet: 'The First',
        truncated: false
      },
      <Tweet>{
        id: 2,
        created: 'later',
        tweet: 'The Second',
        truncated: true
      }
    ]);

    expect(component.displayedColumns).toEqual(['tweet', 'truncated', 'created']);
  }));
});
