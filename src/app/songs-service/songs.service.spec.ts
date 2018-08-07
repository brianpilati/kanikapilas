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
        <Song>{
          id: 1,
          title: 'Africa',
          artist: 'Toto',
          stars: 1,
          flowered: false,
          genre: 'Pop'
        }
      ]);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('GET');
    request.flush([
      <Song>{
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1,
        flowered: false,
        genre: 'Pop'
      }
    ]);

    songsService.getSongs().subscribe(songs => {
      expect(songs).toEqual([
        <Song>{
          id: 1,
          title: 'Africa',
          artist: 'Toto',
          stars: 1,
          flowered: false,
          genre: 'Pop'
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

  it('should test getSongByFirstLetter', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    songsService.getSongByFirstLetter().subscribe(songs => {
      expect(songs).toEqual(['A', 'M', 'Z']);
    });

    const returnTestSongs = Object.assign([], TestSongs);
    returnTestSongs.unshift(<Song>{
      id: 2333,
      title: 'zorro',
      artist: 'rene',
      stars: 3,
      flowered: true,
      genre: 'classics'
    });

    returnTestSongs.unshift(<Song>{
      id: 32323,
      title: 'zorro',
      artist: 'rene',
      stars: 3,
      flowered: false,
      genre: '80s'
    });
    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('GET');
    request.flush(returnTestSongs);
  }));

  it('should test getSortedSongs', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    songsService.getSortedSongs('A').subscribe(songs => {
      expect(songs).toEqual([
        <Song>{
          id: 1,
          title: 'Africa',
          artist: 'Toto',
          stars: 1,
          flowered: false,
          genre: 'Pop'
        }
      ]);
    });

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('GET');
    request.flush(TestSongs);

    songsService.getSortedSongs('M').subscribe(songs => {
      expect(songs).toEqual([
        <Song>{
          id: 2,
          title: 'Manic Monday',
          artist: 'The Bangles',
          stars: 2,
          flowered: true,
          genre: '80s'
        }
      ]);
    });

    httpMock.expectNone('http://localhost:3000/api/songs');

    songsService.getSortedSongs('m').subscribe(songs => {
      expect(songs).toEqual([
        <Song>{
          id: 2,
          title: 'Manic Monday',
          artist: 'The Bangles',
          stars: 2,
          flowered: true,
          genre: '80s'
        }
      ]);
    });

    httpMock.expectNone('http://localhost:3000/api/songs');

    songsService.getSortedSongs('y').subscribe(songs => {
      expect(songs).toEqual([]);
    });

    httpMock.expectNone('http://localhost:3000/api/songs');
  }));

  it('should test updateSong', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const song = <Song>{
      id: 22,
      title: 'Brian',
      artist: 'Pilati',
      stars: 1,
      flowered: false,
      genre: 'Disney'
    };

    songsService.updateSong(song).subscribe(_song_ => {
      expect(_song_[0]).toEqual(<Song>{
        id: 22,
        title: 'Brian',
        artist: 'Pilati',
        stars: 1,
        flowered: false,
        genre: 'Disney'
      });
    });

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('PUT');
    expect(request.request.body).toEqual({
      id: 22,
      title: 'Brian',
      artist: 'Pilati',
      stars: 1,
      flowered: false,
      genre: 'Disney'
    });
    request.flush([song]);
  }));

  it('should test saveSong', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const song = <Song>{
      id: 0,
      title: 'Brian',
      artist: 'Pilati',
      stars: 1,
      flowered: false,
      genre: 'Disney'
    };

    songsService.saveSong(song).subscribe(_song_ => {
      expect(_song_[0]).toEqual(<Song>{
        id: 0,
        title: 'Brian',
        artist: 'Pilati',
        stars: 1,
        flowered: false,
        genre: 'Disney'
      });
    });

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({
      id: 0,
      title: 'Brian',
      artist: 'Pilati',
      stars: 1,
      flowered: false,
      genre: 'Disney'
    });
    request.flush([song]);
  }));
});
