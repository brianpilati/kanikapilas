import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { LastFmComponent } from './last-fm.component';
import { MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';

describe('LastFmComponent', () => {
  let component: LastFmComponent;
  let fixture: ComponentFixture<LastFmComponent>;
  const track = new EventEmitter<string>();
  const artist = new EventEmitter<string>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [LastFmComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LastFmComponent);
        component = fixture.componentInstance;
        component.track = track;
        component.artist = artist;
        fixture.detectChanges();
      });
  }));

  it('should test track emit', () => {
    track.emit('new track');
    fixture.detectChanges();
    expect(component.coverArtForm.get('track').value).toBe('new track');
  });

  it('should test artist emit', () => {
    artist.emit('new artist');
    fixture.detectChanges();
    expect(component.coverArtForm.get('artist').value).toBe('new artist');
  });

  it('should test coverArtImageUrl emit', () => {
    let coverArtImageUrl: string;
    component.coverArtImageUrl.subscribe(_coverArtImageUrl_ => (coverArtImageUrl = _coverArtImageUrl_));
    component.setImageUrl([0, 1, { '#text': 'newCoverArtImageUrl' }]);
    fixture.detectChanges();
    expect(coverArtImageUrl).toBe('newCoverArtImageUrl');
  });

  it('should test findByTrack values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    let coverArtImageUrl: string;
    component.coverArtImageUrl.subscribe(_coverArtImageUrl_ => (coverArtImageUrl = _coverArtImageUrl_));

    component.findByTrack('mbid');

    const request = httpMock.expectOne(
      'http://ws.audioscrobbler.com/2.0/?api_key=test-lastfm-key&format=json&method=track.getInfo&mbid=mbid'
    );
    expect(request.request.method).toEqual('GET');

    request.flush({
      track: {
        album: {
          image: [0, 1, { '#text': 'newCoverArtImageUrl' }]
        }
      }
    });

    fixture.detectChanges();

    expect(coverArtImageUrl).toBe('newCoverArtImageUrl');
  }));

  it(
    'should test albums values',
    fakeAsync(
      inject([HttpTestingController], (httpMock: HttpTestingController) => {
        component.coverArtForm.get('album').setValue('album search');
        fixture.detectChanges();
        tick(500);

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
                }
              ]
            }
          }
        });

        expect(component.displayAlbums).toBeTruthy();
        expect(component.displayArtists).toBeFalsy();
        expect(component.displayFindByTrackButton).toBeFalsy();
        expect(component.albumSource).toEqual([Object({ mbid: 'mbid' })]);
      })
    )
  );

  it('should test searchArtist values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    component.coverArtForm.get('artist').setValue('artist search');
    component.searchArtist();

    const request = httpMock.expectOne(
      'http://ws.audioscrobbler.com/2.0/?api_key=test-lastfm-key&format=json&method=artist.gettopalbums&artist=artist search'
    );
    expect(request.request.method).toEqual('GET');

    request.flush({
      topalbums: {
        album: [
          {
            mbid: 'mbid'
          }
        ]
      }
    });

    expect(component.displayAlbums).toBeFalsy();
    expect(component.displayArtists).toBeTruthy();
    expect(component.displayFindByTrackButton).toBeFalsy();
    expect(component.artistSource).toEqual([Object({ mbid: 'mbid' })]);
  }));

  describe('searchTrack', () => {
    it('should test searchTrack values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      component.coverArtForm.get('artist').setValue('artist-search');
      component.coverArtForm.get('track').setValue('track-search');
      component.searchTrack();

      const request = httpMock.expectOne(
        'http://ws.audioscrobbler.com/2.0/?api_key=test-lastfm-key&format=json&method=track.search&track=track-search&artist=artist-search'
      );
      expect(request.request.method).toEqual('GET');

      request.flush({
        results: {
          trackmatches: {
            track: [
              {
                mbid: 'mbid'
              }
            ]
          }
        }
      });

      expect(component.displayAlbums).toBeTruthy();
      expect(component.displayArtists).toBeFalsy();
      expect(component.displayFindByTrackButton).toBeTruthy();
      expect(component.albumSource).toEqual([Object({ mbid: 'mbid' })]);
    }));

    it('should test searchTrack values - no track', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        component.coverArtForm.get('artist').setValue('artist search');
        component.searchTrack();

        httpMock.expectNone('http://ws.audioscrobbler.com');

        expect(component.displayAlbums).toBeFalsy();
        expect(component.displayArtists).toBeFalsy();
        expect(component.displayFindByTrackButton).toBeFalsy();
        expect(component.artistSource).toBeUndefined();
      }
    ));

    it('should test searchTrack values - no artist', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        component.coverArtForm.get('track').setValue('track search');
        component.searchTrack();

        httpMock.expectNone('http://ws.audioscrobbler.com');

        expect(component.displayAlbums).toBeFalsy();
        expect(component.displayArtists).toBeFalsy();
        expect(component.displayFindByTrackButton).toBeFalsy();
        expect(component.artistSource).toBeUndefined();
      }
    ));

    it('should test searchTrack values - no artist or track', inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
        component.searchTrack();

        httpMock.expectNone('http://ws.audioscrobbler.com');

        expect(component.displayAlbums).toBeFalsy();
        expect(component.displayArtists).toBeFalsy();
        expect(component.displayFindByTrackButton).toBeFalsy();
        expect(component.artistSource).toBeUndefined();
      }
    ));
  });
});
