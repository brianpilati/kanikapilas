import { tick, async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import 'hammerjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SongDetailComponent } from './song-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../models/song';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatCardModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SongGenreComponent } from '../song-genre/song-genre.component';

let activatedRouteId: any;

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
  let locationServiceSpy;
  let compiled;

  beforeEach(async(() => {
    locationServiceSpy = jasmine.createSpyObj('Location', ['back']);
    locationServiceSpy.back.and.returnValue(22);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [SongDetailComponent, SongGenreComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: Location,
          useValue: locationServiceSpy
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SongDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        compiled = fixture.debugElement.nativeElement;
      });
  }));

  it('should test getSong and default values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component.song).toEqual(new Song());

    const request = httpMock.expectOne('http://localhost:3000/api/songs/1');
    expect(request.request.method).toEqual('GET');
    request.flush(<Song>{
      id: 1,
      title: 'Africa',
      artist: 'Toto',
      stars: 1,
      flowered: true,
      imageName: 'africa',
      genre: 'Pop, 80s'
    });

    expect(component.song).toEqual({
      id: 1,
      title: 'Africa',
      artist: 'Toto',
      stars: 1,
      flowered: true,
      imageName: 'africa',
      genre: 'Pop, 80s'
    });

    expect(component.stars).toEqual([true, false, false, false, false]);

    expect(component.genres).toEqual(['Pop', '80s']);
  }));

  it('should test getImageAssetName', () => {
    component.songForm.get('imageName').setValue('africa.png');
    expect(component.getImageAssetSrc()).toBe('assets/africa.png');
  });

  it('should test getImageDeploymentName', () => {
    component.songForm.get('imageName').setValue('africa.png');
    expect(component.getImageDeploymentSrc()).toBe('../../assets/africa.png');
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
      genre: 'Pop, Spiritual',
      searchTerm: ''
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
      genre: 'Pop, 80s and 90s',
      searchTerm: ''
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
      genre: `80s and 90s, Spiritual's Songs`,
      searchTerm: ''
    });

    expect(component.genres).toEqual(['80s and 90s', `Spiritual's Songs`]);
  });

  it('should test filteredOptions', () => {
    let filteredOptions: string[] = [];

    component.filteredOptions.subscribe(options => {
      filteredOptions = options;
    });

    component.songForm.get('searchTerm').setValue('Pop');

    expect(filteredOptions).toEqual(['Pop']);

    component.searchTermSelected();

    expect(filteredOptions).toEqual([
      '80s',
      '90s',
      `Children's`,
      'Country',
      'Disney',
      'Oldies',
      'Picking',
      'Show Tunes',
      'Campfire',
      'Classics',
      'Fun',
      'Patriotic',
      'Spiritual'
    ]);

    component.songForm.get('searchTerm').setValue('Patriotic');

    expect(filteredOptions).toEqual(['Patriotic']);

    component.searchTermSelected();

    expect(filteredOptions).toEqual([
      '80s',
      '90s',
      `Children's`,
      'Country',
      'Disney',
      'Oldies',
      'Picking',
      'Show Tunes',
      'Campfire',
      'Classics',
      'Fun',
      'Spiritual'
    ]);

    component.deleteGenre('Pop');
    component.songForm.get('searchTerm').setValue('');

    expect(filteredOptions).toEqual([
      '80s',
      '90s',
      `Children's`,
      'Country',
      'Disney',
      'Oldies',
      'Picking',
      'Pop',
      'Show Tunes',
      'Campfire',
      'Classics',
      'Fun',
      'Spiritual'
    ]);
  });

  it('should test searchTermSelected', () => {
    component.songForm.get('searchTerm').setValue('Pop');

    component.searchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      genre: 'Pop',
      searchTerm: ''
    });

    expect(component.genres).toEqual(['Pop']);

    component.songForm.get('searchTerm').setValue('80s');

    component.searchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      genre: 'Pop, 80s',
      searchTerm: ''
    });

    expect(component.genres).toEqual(['Pop', '80s']);

    component.songForm.get('searchTerm').setValue('Primary Songs');

    component.searchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      searchTerm: '',
      genre: 'Pop, 80s, Primary Songs'
    });

    expect(component.genres).toEqual(['Pop', '80s', 'Primary Songs']);

    component.songForm.get('searchTerm').setValue('Spiritual Songs');

    component.searchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      searchTerm: '',
      genre: 'Pop, 80s, Primary Songs, Spiritual Songs'
    });

    expect(component.genres).toEqual(['Pop', '80s', 'Primary Songs', 'Spiritual Songs']);

    component.songForm.get('searchTerm').setValue('Pop');

    component.searchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
      imageName: '',
      searchTerm: '',
      genre: 'Pop, 80s, Primary Songs, Spiritual Songs'
    });

    expect(component.genres).toEqual(['Pop', '80s', 'Primary Songs', 'Spiritual Songs']);
  });

  describe('save', () => {
    it('should test save - valid', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      let request = httpMock.expectOne('http://localhost:3000/api/songs/1');
      expect(request.request.method).toEqual('GET');
      request.flush(<Song>{
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1,
        flowered: true,
        imageName: 'africa',
        genre: 'Pop, 80s'
      });
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
        flowered: true,
        imageName: 'africa',
        searchTerm: '',
        genre: 'Pop, 80s'
      });
      expect(request.request.method).toEqual('PUT');
      request.flush({});
      expect(locationServiceSpy.back).toHaveBeenCalledWith();

      expect(component.song).toEqual(<Song>{
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1,
        flowered: true,
        imageName: 'africa',
        genre: 'Pop, 80s'
      });

      expect(component.songForm.value).toEqual({
        id: 1,
        title: 'brian',
        artist: 'Toto',
        stars: 1,
        flowered: true,
        imageName: 'africa',
        searchTerm: '',
        genre: 'Pop, 80s'
      });
    }));

    it('should test save - invalid', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const request = httpMock.expectOne('http://localhost:3000/api/songs/1');
      expect(request.request.method).toEqual('GET');
      request.flush(<Song>{
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1,
        flowered: true,
        imageName: 'africa',
        genre: 'Pop, 80s'
      });
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
          flowered: true,
          imageName: 'africa',
          searchTerm: '',
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
      searchTerm: '',
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
      searchTerm: '',
      genre: 'pop, 80s'
    });

    expect(component.stars).toEqual([true, false, false, false, false]);
  });

  describe('goBack', () => {
    it('should handle a goBack event', () => {
      component.goBack();
      expect(locationServiceSpy.back).toHaveBeenCalledWith();
    });

    it('should handle a goBack html event', () => {
      fixture.detectChanges();
      const backButton = compiled.querySelector('[name="goBackButton"]');
      expect(backButton.textContent.trim()).toBe('chevron_left Return to Songs');
      backButton.click();
      expect(locationServiceSpy.back).toHaveBeenCalledWith();
    });
  });
});

describe('SongDetailComponent with Save and Fake Data', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;
  let locationServiceSpy;

  beforeEach(async(() => {
    locationServiceSpy = jasmine.createSpyObj('Location', ['back']);
    locationServiceSpy.back.and.returnValue(22);
    activatedRouteId = 'new';

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [SongDetailComponent, SongGenreComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: Location,
          useValue: locationServiceSpy
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
      searchTerm: '',
      genre: ''
    });

    expect(component.stars).toEqual([false, false, false, false, false]);

    component.songForm.setValue(
      Object.assign(component.songForm.value, {
        title: 'New Song',
        artist: 'new Artist',
        stars: 2,
        genre: '80s',
        imageName: 'new_song'
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
      genre: '80s',
      searchTerm: ''
    });
    expect(request.request.method).toEqual('POST');
    request.flush({
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      imageName: 'new_song',
      genre: 'classics'
    });

    expect(component.song).toEqual(<Song>{
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      imageName: 'new_song',
      genre: 'classics'
    });

    expect(component.songForm.value).toEqual({
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      imageName: 'new_song',
      searchTerm: '',
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
      genre: 'classics',
      searchTerm: ''
    });
    expect(request.request.method).toEqual('PUT');
    request.flush({
      id: 1,
      title: 'Updated Song - Response',
      artist: 'New Artist - Response',
      stars: 1111,
      flowered: false,
      imageName: 'new_song',
      genre: 'classics'
    });

    expect(component.song).toEqual(<Song>{
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      imageName: 'new_song',
      genre: 'classics'
    });

    expect(component.songForm.value).toEqual({
      id: 1,
      title: 'Updated Song',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      searchTerm: '',
      imageName: 'new_song',
      genre: 'classics'
    });

    expect(locationServiceSpy.back).toHaveBeenCalledWith();
  }));
});
