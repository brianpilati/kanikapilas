import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SongsService } from './songs.service';

describe('SongsService', () => {
  let songsService: SongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [SongsService]
    });
  });

  beforeEach(inject([SongsService], (service: SongsService) => {
    songsService = service;
  }));

  it('should be created', () => {
    expect(songsService).toBeTruthy();
  });

  it('should test getSongs', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      songsService.getSongs().subscribe(songs => {
        expect(songs).toEqual([{
          id: 1,
          title: 'Africa',
          artist: 'Toto'
        }]);
      })

      let request = httpMock.expectOne('http://localhost:3000/api/songs');
      expect(request.request.method).toEqual('GET');
      request.flush([{
        id: 1,
        title: 'Africa',
        artist: 'Toto'
      }]);

      songsService.getSongs().subscribe(songs => {
        expect(songs).toEqual([{
          id: 1,
          title: 'Africa',
          artist: 'Toto'
        }]);
      })

      httpMock.expectNone('http://localhost:3000/api/songs');
  }));

  it('should test getSong', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      songsService.getSong('22').subscribe(songs => {
        expect(songs).toEqual([{
          id: 22,
          title: 'Africa',
          artist: 'Toto'
        }]);
      })

      const request = httpMock.expectOne('http://localhost:3000/api/songs/22');
      expect(request.request.method).toEqual('GET');
      request.flush([{
        id: 22,
        title: 'Africa',
        artist: 'Toto'
      }]);
  }));
});
