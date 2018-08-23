import { TestBed, inject } from '@angular/core/testing';

import { LastFmService } from './last-fm.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('LastFmServiceService', () => {
  let service: LastFmService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LastFmService]
    });
  });

  beforeEach(inject([LastFmService], (_service_: LastFmService) => {
    service = _service_;
  }));

  it('should test getArtist values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    let result: any[];
    service.getArtist('artist search').subscribe(_result_ => (result = _result_));

    const request = httpMock.expectOne(
      'http://ws.audioscrobbler.com/2.0/?api_key=test-lastfm-key&format=json&method=artist.gettopalbums&artist=artist search'
    );
    expect(request.request.method).toEqual('GET');

    request.flush({
      topalbums: {
        album: [
          {
            mbid: 'mbid'
          },
          {
            mbid: ''
          }
        ]
      }
    });

    expect(result).toEqual([Object({ mbid: 'mbid' })]);
  }));

  it('should test getAlbum values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    let result: any[];
    service.getAlbum('album search').subscribe(_result_ => (result = _result_));

    const request = httpMock.expectOne(
      'http://ws.audioscrobbler.com/2.0/?api_key=test-lastfm-key&format=json&method=album.search&album=album search'
    );
    expect(request.request.method).toEqual('GET');

    request.flush({
      results: {
        albummatches: {
          album: [
            {
              mbid: 'mbid'
            },
            {
              mbid: ''
            }
          ]
        }
      }
    });

    expect(result).toEqual([Object({ mbid: 'mbid' })]);
  }));

  it('should test getTracks values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    let result: any[];
    service.getTracks('track search', 'artist search').subscribe(_result_ => (result = _result_));

    const request = httpMock.expectOne(
      'http://ws.audioscrobbler.com/2.0/?api_key=test-lastfm-key&format=json&method=track.search&track=track search&artist=artist search'
    );
    expect(request.request.method).toEqual('GET');

    request.flush({
      results: {
        trackmatches: {
          track: [
            {
              mbid: 'mbid'
            },
            {
              mbid: ''
            }
          ]
        }
      }
    });

    expect(result).toEqual([Object({ mbid: 'mbid' })]);
  }));

  it('should test getTrack values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    let result: any[];
    service.getTrack('track mbid').subscribe(_result_ => (result = _result_));

    const request = httpMock.expectOne(
      'http://ws.audioscrobbler.com/2.0/?api_key=test-lastfm-key&format=json&method=track.getInfo&mbid=track mbid'
    );
    expect(request.request.method).toEqual('GET');

    request.flush({
      track: {
        album: {
          image: {
            image: 'image'
          }
        }
      }
    });

    expect(result).toEqual([Object({ image: 'image' })]);
  }));
});
