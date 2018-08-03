import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SongsService } from './songs.service';
import { TestSongs } from '../../testing/test-songs';
import { Song } from '../models/song';

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

  it('should test getSongs', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    songsService.getSongs().subscribe(songs => {
      expect(songs).toEqual([
        {
          id: 1,
          title: 'Africa',
          artist: 'Toto',
          stars: 1
        }
      ]);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('GET');
    request.flush([
      {
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1
      }
    ]);

    songsService.getSongs().subscribe(songs => {
      expect(songs).toEqual([
        {
          id: 1,
          title: 'Africa',
          artist: 'Toto',
          stars: 1
        }
      ]);
    });

    httpMock.expectNone('http://localhost:3000/api/songs');
  }));

  it('should test getSong', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    songsService.getSong('22').subscribe(song => {
      expect(song[0]).toEqual({
        id: 22,
        title: 'Africa',
        artist: 'Toto',
        stars: 1
      });
    });

    const request = httpMock.expectOne('http://localhost:3000/api/songs/22');
    expect(request.request.method).toEqual('GET');
    request.flush([
      {
        id: 22,
        title: 'Africa',
        artist: 'Toto',
        stars: 1
      }
    ]);
  }));

  it('should test getSortedSongs', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    songsService.getSortedSongs('A').subscribe(songs => {
      expect(songs).toEqual([
        {
          id: 1,
          title: 'Africa',
          artist: 'Toto',
          stars: 1
        }
      ]);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('GET');
    request.flush(TestSongs);

    songsService.getSortedSongs('M').subscribe(songs => {
      expect(songs).toEqual([
        {
          id: 2,
          title: 'Manic Monday',
          artist: 'The Bangles',
          stars: 2
        }
      ]);
    });

    httpMock.expectNone('http://localhost:3000/api/songs');

    songsService.getSortedSongs('m').subscribe(songs => {
      expect(songs).toEqual([
        {
          id: 2,
          title: 'Manic Monday',
          artist: 'The Bangles',
          stars: 2
        }
      ]);
    });

    httpMock.expectNone('http://localhost:3000/api/songs');

    songsService.getSortedSongs('z').subscribe(songs => {
      expect(songs).toEqual([]);
    });

    httpMock.expectNone('http://localhost:3000/api/songs');
  }));

  it('should test updateSong', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const song = <Song>{
      id: 22,
      title: 'Brian',
      artist: 'Pilati',
      stars: 1
    };

    songsService.updateSong(song).subscribe(_song_ => {
      expect(_song_[0]).toEqual({
        id: 22,
        title: 'Brian',
        artist: 'Pilati',
        stars: 1
      });
    });

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('PUT');
    expect(request.request.body).toEqual({
      id: 22,
      title: 'Brian',
      artist: 'Pilati',
      stars: 1
    });
    request.flush([song]);
  }));
});
