import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import 'hammerjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SongDetailComponent } from './song-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../models/song';
import {
  MatAutocompleteModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatTableModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SongGenreComponent } from '../song-genre/song-genre.component';
import { TestSongs } from '../../testing/test-songs';
import { ImageResizeComponent } from '../image-resize/image-resize.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { ImageCoordinates } from '../models/image-coordinates';
import { LastFmComponent } from '../last-fm/last-fm.component';
import { DomSanitizer } from '@angular/platform-browser';

let activatedRouteId: any;
let navigationUrl: string;

beforeEach(() => {
  activatedRouteId = 1;
});

const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: function() {
        return activatedRouteId;
      }
    }
  }
};

describe('SongDetailComponent', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;
  let compiled;

  beforeEach(
    fakeAsync(() => {
      navigationUrl = 'not set';

      TestBed.configureTestingModule({
        imports: [
          AngularDraggableModule,
          FormsModule,
          HttpClientTestingModule,
          MatAutocompleteModule,
          MatButtonModule,
          MatCardModule,
          MatFormFieldModule,
          MatIconModule,
          MatInputModule,
          MatSelectModule,
          MatSliderModule,
          MatSlideToggleModule,
          MatTableModule,
          MatTabsModule,
          NoopAnimationsModule,
          ReactiveFormsModule,
          RouterTestingModule
        ],
        declarations: [ImageResizeComponent, LastFmComponent, SongDetailComponent, SongGenreComponent],
        providers: [
          {
            provide: DomSanitizer,
            useValue: {
              bypassSecurityTrustResourceUrl: function(url) {
                return url;
              },
              sanitize: function() {
                return '';
              }
            }
          },
          {
            provide: Router,
            useValue: {
              navigate: function(_url_) {
                navigationUrl = _url_;
              }
            }
          },
          {
            provide: ActivatedRoute,
            useValue: activatedRouteMock
          }
        ]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(SongDetailComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
          tick();
          compiled = fixture.debugElement.nativeElement;
        });
    })
  );

  it('should test getSong and default values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    let coordinates: ImageCoordinates;

    component.coordinates.subscribe(_coordinates_ => (coordinates = _coordinates_));
    expect(component.song).toEqual(new Song());

    const request = httpMock.expectOne('http://localhost:3000/api/songs/1');
    expect(request.request.method).toEqual('GET');
    request.flush(TestSongs[0]);

    expect(component.song).toEqual(<Song>{
      id: 1,
      title: 'Africa',
      artist: 'Toto',
      stars: 1,
      flowered: false,
      genre: 'Pop, 80s',
      firstNote: 1,
      capo: 0,
      imageName: 'africa',
      imageTop: 10,
      imageBottom: 20,
      coverArtUrl: 'http://toto/africa/coverart.png'
    });

    expect(component.stars).toEqual([true, false, false, false, false]);

    expect(component.genres).toEqual(['Pop', '80s']);
    expect(coordinates).toEqual(<ImageCoordinates>{
      top: 10,
      bottom: 20,
      left: 37.5,
      right: 212.5
    });
  }));

  it('should test getSong and null genres values', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      const request = httpMock.expectOne('http://localhost:3000/api/songs/1');
      expect(request.request.method).toEqual('GET');
      let clonedSongs = TestSongs.map(x => Object.assign({}, x));
      const testSong = clonedSongs[0];
      testSong.genre = null;
      request.flush(TestSongs[0]);

      expect(component.song).toEqual(<Song>{
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1,
        flowered: false,
        genre: null,
        firstNote: 1,
        capo: 0,
        imageName: 'africa',
        imageTop: 10,
        imageBottom: 20,
        coverArtUrl: 'http://toto/africa/coverart.png'
      });

      expect(component.genres).toEqual([]);
    }
  ));

  it('should test setCoverArt', () => {
    component.setCoverArt('coverArtUrl');
    expect(component.songForm.get('coverArtUrl').value).toBe('coverArtUrl');
  });

  it('should test track emit', () => {
    let track: string;
    component.track.subscribe(_track_ => (track = _track_));
    component.songForm.get('title').setValue('track changed');
    fixture.detectChanges();
    expect(track).toBe('track changed');
  });

  it('should test artist emit', () => {
    let artist: string;
    component.artist.subscribe(_artist_ => (artist = _artist_));
    component.songForm.get('artist').setValue('artist changed');
    fixture.detectChanges();
    expect(artist).toBe('artist changed');
  });

  it('should test resize', () => {
    component.resize(<ImageCoordinates>{
      top: 20,
      bottom: 30
    });
    expect(component.songForm.get('imageTop').value).toBe(20);
    expect(component.songForm.get('imageBottom').value).toBe(30);
  });

  it('should test getImageAssetName', () => {
    expect(component.getImageAssetSrc()).toBe('');
    component.songForm.get('title').setValue('africa');
    component.songForm.get('artist').setValue('toto');
    expect(component.getImageAssetSrc()).toBe('http://localhost:3000/local/assets/t/toto/africa.png');
  });

  it('should test getImageDeploymentName', () => {
    component.songForm.get('title').setValue('africa');
    component.songForm.get('artist').setValue('toto');

    const destinationImage = compiled.querySelector('#mat-tab-label-2-2');

    fixture.whenStable().then(() => {
      destinationImage.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const deployedImage = compiled.querySelector('[name="deployedImage"]');
        console.log(deployedImage);
        expect(deployedImage.src).toBe('http://localhost:3000/assets/t/toto/africa_1.png');
      });
    });
  });

  describe('updateImageName', () => {
    it('should test updateImageName with no space', () => {
      component.songForm.get('imageName').setValue('');
      component.songForm.get('title').setValue('africa');

      component.updateImageName();

      expect(component.songForm.get('imageName').value).toBe('africa.png');
    });

    it('should test updateImageName with a space', () => {
      component.songForm.get('title').setValue('MANIC MONDAY');

      component.updateImageName();

      expect(component.songForm.get('imageName').value).toBe('manic_monday.png');
    });

    it('should test not updateImageName with a space', () => {
      component.songForm.get('title').setValue('MANIC MONDAY');
      component.updateImageName();

      component.songForm.get('title').setValue('MANIC MONDAY 2');
      component.updateImageName();

      expect(component.songForm.get('imageName').value).toBe('manic_monday.png');
    });
  });

  it('should test deleteGenre', () => {
    component.songForm.get('genre').setValue('Pop, 80s and 90s, Spiritual');

    component.deleteGenre('80s and 90s');

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      imageTop: 0,
      imageBottom: 0,
      genre: 'Pop, Spiritual',
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: ''
    });

    expect(component.genres).toEqual(['Pop', 'Spiritual']);

    component.songForm.get('genre').setValue(`Pop, 80s and 90s, Spiritual's Songs`);

    component.deleteGenre(`Spiritual's Songs`);

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      imageTop: 0,
      imageBottom: 0,
      genre: 'Pop, 80s and 90s',
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: ''
    });

    expect(component.genres).toEqual(['Pop', '80s and 90s']);

    component.songForm.get('genre').setValue(`Pop, 80s and 90s, Spiritual's Songs`);

    component.deleteGenre('Pop');

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      imageTop: 0,
      imageBottom: 0,
      genre: `80s and 90s, Spiritual's Songs`,
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: ''
    });

    expect(component.genres).toEqual(['80s and 90s', `Spiritual's Songs`]);
  });

  it('should test filteredGenres', () => {
    let filteredGenres: string[] = [];

    component.filteredGenres.subscribe(options => {
      filteredGenres = options;
    });

    component.songForm.get('genreSearchTerm').setValue('Pop');

    expect(filteredGenres).toEqual(['Pop']);

    component.genreSearchTermSelected();

    expect(filteredGenres).toEqual([
      'Country',
      'Classics',
      '80s and 90s',
      'Oldies',
      'Spiritual',
      'Disney',
      'Fun',
      'Show Tunes',
      `Children's`,
      'Campfire',
      'Picking',
      'Patriotic'
    ]);

    component.songForm.get('genreSearchTerm').setValue('Patriotic');

    expect(filteredGenres).toEqual(['Patriotic']);

    component.genreSearchTermSelected();

    expect(filteredGenres).toEqual([
      'Country',
      'Classics',
      '80s and 90s',
      'Oldies',
      'Spiritual',
      'Disney',
      'Fun',
      'Show Tunes',
      `Children's`,
      'Campfire',
      'Picking'
    ]);

    component.deleteGenre('Pop');
    component.songForm.get('genreSearchTerm').setValue('');

    expect(filteredGenres).toEqual([
      'Country',
      'Classics',
      '80s and 90s',
      'Pop',
      'Oldies',
      'Spiritual',
      'Disney',
      'Fun',
      'Show Tunes',
      `Children's`,
      'Campfire',
      'Picking'
    ]);
  });

  it('should test genreSearchTermSelected', () => {
    component.songForm.get('genreSearchTerm').setValue('Pop');

    component.genreSearchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      imageTop: 0,
      imageBottom: 0,
      genre: 'Pop',
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: ''
    });

    expect(component.genres).toEqual(['Pop']);

    component.songForm.get('genreSearchTerm').setValue('80s');

    component.genreSearchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      imageTop: 0,
      imageBottom: 0,
      genre: 'Pop, 80s',
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: ''
    });

    expect(component.genres).toEqual(['Pop', '80s']);

    component.songForm.get('genreSearchTerm').setValue('Primary Songs');

    component.genreSearchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      imageTop: 0,
      imageBottom: 0,
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      genre: 'Pop, 80s, Primary Songs',
      createdDate: ''
    });

    expect(component.genres).toEqual(['Pop', '80s', 'Primary Songs']);

    component.songForm.get('genreSearchTerm').setValue('Spiritual Songs');

    component.genreSearchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      imageTop: 0,
      imageBottom: 0,
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: '',
      genre: 'Pop, 80s, Primary Songs, Spiritual Songs'
    });

    expect(component.genres).toEqual(['Pop', '80s', 'Primary Songs', 'Spiritual Songs']);

    component.songForm.get('genreSearchTerm').setValue('Pop');

    component.genreSearchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      imageTop: 0,
      imageBottom: 0,
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: '',
      genre: 'Pop, 80s, Primary Songs, Spiritual Songs'
    });

    expect(component.genres).toEqual(['Pop', '80s', 'Primary Songs', 'Spiritual Songs']);
  });

  describe('save', () => {
    it('should test save - valid', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      let request = httpMock.expectOne('http://localhost:3000/api/songs/1');
      expect(request.request.method).toEqual('GET');
      request.flush(TestSongs[0]);
      fixture.detectChanges();

      component.songForm.get('title').setValue('brian');

      const saveButton = compiled.querySelector('[name="saveButton"]');
      expect(saveButton.textContent.trim()).toBe('Save');
      saveButton.click();

      request = httpMock.expectOne('http://localhost:3000/api/songs');
      expect(request.request.body).toEqual({
        id: 1,
        title: 'brian',
        artist: 'Toto',
        stars: 1,
        flowered: false,
        imageName: 'africa',
        imageTop: 10,
        imageBottom: 20,
        genreSearchTerm: '',
        capo: 0,
        firstNote: 1,
        coverArtUrl: 'http://toto/africa/coverart.png',
        createdDate: '',
        genre: 'Pop, 80s'
      });
      expect(request.request.method).toEqual('PUT');
      request.flush({});
      expect(navigationUrl).toEqual(['songs']);

      expect(component.song).toEqual(<Song>{
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1,
        flowered: false,
        firstNote: 1,
        capo: 0,
        coverArtUrl: 'http://toto/africa/coverart.png',
        imageName: 'africa',
        imageTop: 10,
        imageBottom: 20,
        genre: 'Pop, 80s'
      });

      expect(component.songForm.value).toEqual({
        id: 1,
        title: 'brian',
        artist: 'Toto',
        stars: 1,
        flowered: false,
        imageName: 'africa',
        imageTop: 10,
        imageBottom: 20,
        genreSearchTerm: '',
        capo: 0,
        firstNote: 1,
        coverArtUrl: 'http://toto/africa/coverart.png',
        createdDate: '',
        genre: 'Pop, 80s'
      });
    }));

    it('should test save - invalid', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const request = httpMock.expectOne('http://localhost:3000/api/songs/1');
      expect(request.request.method).toEqual('GET');
      request.flush(TestSongs[0]);
      fixture.detectChanges();

      component.songForm.get('title').setValue('');

      component.save();

      httpMock.expectNone('http://localhost:3000/api/songs');

      expect(component.songForm.value).toEqual(
        Object({
          id: 1,
          title: '',
          artist: 'Toto',
          stars: 1,
          flowered: false,
          imageName: 'africa',
          imageTop: 10,
          imageBottom: 20,
          genreSearchTerm: '',
          capo: 0,
          firstNote: 1,
          coverArtUrl: 'http://toto/africa/coverart.png',
          createdDate: '',
          genre: 'Pop, 80s'
        })
      );
    }));
  });

  it('should handle a starsChanged event', () => {
    fixture.detectChanges();
    const originalSong = {
      id: 2222,
      title: 'title - changed',
      artist: 'artist - changed',
      stars: 1
    };

    component.songForm.setValue(Object.assign(component.songForm.value, originalSong));

    component.starsChanged();

    expect(component.stars).toEqual([true, false, false, false, false]);

    component.songForm.get('stars').setValue(5);
    component.starsChanged();

    expect(component.stars).toEqual([true, true, true, true, true]);

    component.songForm.get('stars').setValue(2);
    component.starsChanged();

    expect(component.stars).toEqual([true, true, false, false, false]);

    component.songForm.get('stars').setValue(4);
    component.starsChanged();

    expect(component.stars).toEqual([true, true, true, true, false]);

    component.songForm.get('stars').setValue(1);
    component.starsChanged();

    expect(component.stars).toEqual([true, false, false, false, false]);

    component.songForm.get('stars').setValue(0);
    component.starsChanged();

    expect(component.stars).toEqual([false, false, false, false, false]);
  });

  it('should handle a resetForm event', () => {
    fixture.detectChanges();
    component.song = <Song>{
      id: 2222,
      title: 'title - changed',
      artist: 'artist - changed',
      stars: 1,
      flowered: true,
      imageName: 'title - changed',
      genre: 'pop, 80s'
    };

    component.songForm.setValue(
      Object.assign(component.songForm.value, {
        id: 2222,
        title: 'title - changed',
        artist: 'artist - changed',
        stars: 2,
        flowered: false,
        imageName: 'title - changed',
        imageTop: 0,
        imageBottom: 0,
        genre: 'classics'
      })
    );

    expect(component.songForm.value).toEqual({
      id: 2222,
      title: 'title - changed',
      artist: 'artist - changed',
      stars: 2,
      flowered: false,
      imageName: 'title - changed',
      imageTop: 0,
      imageBottom: 0,
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: '',
      genre: 'classics'
    });

    component.starsChanged();

    expect(component.stars).toEqual([true, true, false, false, false]);

    component.resetForm();

    expect(component.songForm.value).toEqual({
      id: 2222,
      title: 'title - changed',
      artist: 'artist - changed',
      stars: 1,
      flowered: true,
      imageName: 'title - changed',
      imageTop: 0,
      imageBottom: 0,
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: '',
      genre: 'pop, 80s'
    });

    expect(component.stars).toEqual([true, false, false, false, false]);
  });

  describe('goBack', () => {
    it('should handle a goBack event', () => {
      component.goBack();
      expect(navigationUrl).toEqual(['songs']);
    });

    it('should handle a goBack html event', () => {
      fixture.detectChanges();
      const backButton = compiled.querySelector('[name="goBackButton"]');
      expect(backButton.textContent.trim()).toBe('chevron_left Return to Songs');
      backButton.click();
      expect(navigationUrl).toEqual(['songs']);
    });
  });
});

describe('SongDetailComponent with Save and Fake Data', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;

  beforeEach(async(() => {
    navigationUrl = 'not set';
    activatedRouteId = 'new';

    TestBed.configureTestingModule({
      imports: [
        AngularDraggableModule,
        FormsModule,
        HttpClientTestingModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatTableModule,
        MatTabsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ImageResizeComponent, LastFmComponent, SongDetailComponent, SongGenreComponent],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: function(url) {
              return url;
            },
            sanitize: function() {
              return '';
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: function(_url_) {
              navigationUrl = _url_;
            }
          }
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SongDetailComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should test getSong whenStable', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component.song).toEqual(new Song());
    expect(component.stars).toEqual(Array(5).fill(false));

    fixture.detectChanges();

    expect(component.song.id).toBe(0);

    expect(component.songForm.value).toEqual({
      id: 0,
      title: '',
      artist: '',
      stars: 0,
      flowered: false,
      imageName: '',
      imageTop: 0,
      imageBottom: 0,
      genreSearchTerm: '',
      capo: 0,
      firstNote: '',
      coverArtUrl: '',
      createdDate: '',
      genre: ''
    });

    expect(component.stars).toEqual([false, false, false, false, false]);

    component.songForm.setValue(
      Object.assign(component.songForm.value, {
        title: 'New Song',
        artist: 'new Artist',
        stars: 2,
        genre: '80s',
        imageName: 'new_song',
        firstNote: 1,
        coverArtUrl: 'http://coverArtUrl'
      })
    );

    component.save();

    let request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.body).toEqual({
      id: 0,
      title: 'New Song',
      artist: 'new Artist',
      stars: 2,
      flowered: false,
      imageName: 'new_song',
      imageTop: 0,
      imageBottom: 0,
      genre: '80s',
      genreSearchTerm: '',
      capo: 0,
      firstNote: 1,
      coverArtUrl: 'http://coverArtUrl',
      createdDate: ''
    });

    expect(request.request.method).toEqual('POST');
    request.flush({
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      imageName: 'new_song',
      imageTop: 0,
      imageBottom: 0,
      firstNote: 1,
      coverArtUrl: 'http://coverArtUrl',
      genre: 'classics'
    });

    expect(component.song).toEqual(<Song>{
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      imageName: 'new_song',
      imageTop: 0,
      imageBottom: 0,
      genre: 'classics',
      firstNote: 1,
      coverArtUrl: 'http://coverArtUrl'
    });

    expect(component.songForm.value).toEqual({
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      imageName: 'new_song',
      imageTop: 0,
      imageBottom: 0,
      genreSearchTerm: '',
      capo: 0,
      firstNote: 1,
      coverArtUrl: 'http://coverArtUrl',
      createdDate: '',
      genre: 'classics'
    });

    // Update
    fixture.detectChanges();
    component.songForm.get('title').setValue('Updated Song');

    component.save();

    request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.body).toEqual({
      id: 1,
      title: 'Updated Song',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      imageName: 'new_song',
      imageTop: 0,
      imageBottom: 0,
      genre: 'classics',
      genreSearchTerm: '',
      capo: 0,
      firstNote: 1,
      coverArtUrl: 'http://coverArtUrl',
      createdDate: ''
    });
    expect(request.request.method).toEqual('PUT');
    request.flush({
      id: 1,
      title: 'Updated Song - Response',
      artist: 'New Artist - Response',
      stars: 1111,
      flowered: false,
      imageName: 'new_song',
      imageTop: 0,
      imageBottom: 0,
      firstNote: 1,
      coverArtUrl: 'http://coverArtUrl',
      genre: 'classics'
    });

    expect(component.song).toEqual(<Song>{
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      imageName: 'new_song',
      imageTop: 0,
      imageBottom: 0,
      genre: 'classics',
      firstNote: 1,
      coverArtUrl: 'http://coverArtUrl'
    });

    expect(component.songForm.value).toEqual({
      id: 1,
      title: 'Updated Song',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      genreSearchTerm: '',
      capo: 0,
      firstNote: 1,
      coverArtUrl: 'http://coverArtUrl',
      createdDate: '',
      imageName: 'new_song',
      imageTop: 0,
      imageBottom: 0,
      genre: 'classics'
    });

    expect(navigationUrl).toEqual(['songs']);
  }));
});
