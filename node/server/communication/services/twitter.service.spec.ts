import { TestBed, inject } from '@angular/core/testing';

import { TwitterService } from './twitter.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Tweet } from 'src/app/models/tweets';
import { TestTweets } from 'src/testing/test-tweets';

describe('TwitterService', () => {
  let twitterService: TwitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TwitterService]
    });
  });

  beforeEach(inject([TwitterService], (service: TwitterService) => {
    twitterService = service;
  }));

  it('should test getTweets', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    let tweets = [];
    twitterService.getTweets().subscribe(_tweets_ => {
      tweets = _tweets_;
    });

    const request = httpMock.expectOne('http://localhost:3000/api/twitter');
    expect(request.request.method).toEqual('GET');
    request.flush(TestTweets);

    expect(tweets).toEqual([
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
  }));
});
