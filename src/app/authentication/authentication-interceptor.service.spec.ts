import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationInterceptorService } from './authentication-interceptor.service';
import { HttpStatusService } from '../http/http-status.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SongsService } from '../songs-service/songs.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('AuthenticationInterceptorService', () => {
  const emitHttpStatus = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HttpStatusService,
          useValue: {
            emitHttpStatus: function(_input_) {
              emitHttpStatus.push(_input_);
            }
          }
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthenticationInterceptorService,
          multi: true
        },
        SongsService
      ]
    });
  });

  it('should test getSongs', inject(
    [SongsService, HttpTestingController],
    (songsService: SongsService, httpMock: HttpTestingController) => {
      songsService.getSongs().subscribe();

      const request = httpMock.expectOne('http://localhost:3000/api/songs');
      expect(request.request.method).toEqual('GET');
      request.flush([]);

      expect(emitHttpStatus).toEqual([true, true, false]);
    }
  ));
});
