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
  MatAutocompleteModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [SongDetailComponent],
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
      genre: 'Pop, 80s'
    });

    expect(component.song).toEqual({
      id: 1,
      title: 'Africa',
      artist: 'Toto',
      stars: 1,
      flowered: true,
      genre: 'Pop, 80s'
    });

    expect(component.stars).toEqual([true, false, false, false, false]);

    expect(component.genres).toEqual(['Pop', '80s']);
  }));

  it('should test save - valid', () => {
    component.songForm.get('searchTerm').setValue('Pop');

    component.searchTermSelected();

    expect(component.songForm.value).toEqual({
      id: '',
      title: '',
      artist: '',
      stars: 1,
      flowered: false,
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
      searchTerm: '',
      genre: 'Pop, 80s, Primary Songs'
    });

    expect(component.genres).toEqual(['Pop', '80s', 'Primary Songs']);
  });

  component.songForm.get('searchTerm').setValue('Spiritual Songs');

  component.searchTermSelected();

  expect(component.songForm.value).toEqual({
    id: '',
    title: '',
    artist: '',
    stars: 1,
    flowered: false,
    searchTerm: '',
    genre: 'Pop, 80s, Primary Songs, Spiritual Songs'
  });

  expect(component.genres).toEqual(['Pop', '80s', 'Primary Songs', 'Spiritual Songs']);

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
        genre: 'Pop, 80s'
      });

      expect(component.songForm.value).toEqual({
        id: 1,
        title: 'brian',
        artist: 'Toto',
        stars: 1,
        flowered: true,
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
      genre: 'pop, 80s'
    };

    component.songForm.setValue(
      Object.assign(component.songForm.value, {
        id: 2222,
        title: 'title - changed',
        artist: 'artist - changed',
        stars: 2,
        flowered: false,
        genre: 'classics'
      })
    );

    expect(component.songForm.value).toEqual({
      id: 2222,
      title: 'title - changed',
      artist: 'artist - changed',
      stars: 2,
      flowered: false,
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
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [SongDetailComponent],
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
      searchTerm: '',
      genre: ''
    });

    expect(component.stars).toEqual([false, false, false, false, false]);

    component.songForm.setValue(
      Object.assign(component.songForm.value, {
        title: 'New Song',
        artist: 'new Artist',
        stars: 2,
        genre: '80s'
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
      genre: 'classics'
    });

    expect(component.song).toEqual(<Song>{
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      genre: 'classics'
    });

    expect(component.songForm.value).toEqual({
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
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
      genre: 'classics'
    });

    expect(component.song).toEqual(<Song>{
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      genre: 'classics'
    });

    expect(component.songForm.value).toEqual({
      id: 1,
      title: 'Updated Song',
      artist: 'New Artist - Response',
      stars: 3,
      flowered: false,
      searchTerm: '',
      genre: 'classics'
    });

    expect(locationServiceSpy.back).toHaveBeenCalledWith();
  }));
});
