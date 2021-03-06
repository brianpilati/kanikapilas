import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SongsComponent } from './songs.component';
import { TestSongs } from '../../testing/test-songs';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { Song } from '../models/song';

describe('SongsComponent', () => {
  let component: SongsComponent;
  let fixture: ComponentFixture<SongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule, MatCardModule, MatIconModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [SongsComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SongsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should test getSongs', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component.songTitles).toBeUndefined();

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('GET');
    request.flush(TestSongs);
    expect(component.songTitles).toEqual(['A', 'M']);
  }));

  it('should test sortSong', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component.sortedSongs).toBeUndefined();

    component.sortSongs('a');

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.method).toEqual('GET');
    request.flush(TestSongs);

    expect(component.sortedSongs).toEqual([
      <Song>{
        id: 1,
        titlePrefix: '',
        title: 'Africa',
        artistPrefix: '',
        artist: 'Toto',
        active: true,
        stars: 1,
        flowered: false,
        capo: 0,
        genre: 'Pop, 80s',
        firstNote: 1,
        imageName: 'africa',
        imageTop: 10,
        imageBottom: 20,
        coverArtUrl: 'http://toto/africa/coverart.png',
        octave: 'None',
        chords: 'g.png, f.png'
      }
    ]);
  }));
});
