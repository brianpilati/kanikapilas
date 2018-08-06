import { tick, async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import 'hammerjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../testing/in-memory-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SongDetailComponent } from './song-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../models/song';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatSliderModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

let activatedRouteId: any;

activatedRouteId = 1;

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
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
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

  it('should test getSong', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component.song).toEqual(new Song());

    const request = httpMock.expectOne('http://localhost:3000/api/songs/1');
    expect(request.request.method).toEqual('GET');
    request.flush({
      id: 1,
      title: 'Africa',
      artist: 'Toto',
      stars: 1
    });

    expect(component.song).toEqual({
      id: 1,
      title: 'Africa',
      artist: 'Toto',
      stars: 1
    });
  }));

  describe('save', () => {
    it('should test savVe - valid', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      let request = httpMock.expectOne('http://localhost:3000/api/songs/1');
      expect(request.request.method).toEqual('GET');
      request.flush({
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1
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
        stars: 1
      });
      expect(request.request.method).toEqual('PUT');

      fixture.whenStable().then(() => {
        expect(component.song).toEqual(
          Object({
            id: 1,
            title: 'Africa',
            artist: 'Toto',
            stars: 1
          })
        );

        expect(component.songForm.value).toEqual(
          Object({
            id: 1,
            title: 'brian',
            artist: 'Toto',
            stars: 1
          })
        );
      });
    }));

    it('should test save - invalid', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      const request = httpMock.expectOne('http://localhost:3000/api/songs/1');
      expect(request.request.method).toEqual('GET');
      request.flush({
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1
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
          stars: 1
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

    expect(component.stars).toEqual(['primary', 'black', 'black', 'black', 'black']);

    component.songForm.get('stars').setValue(5);
    component.starsChanged();

    expect(component.stars).toEqual(['primary', 'primary', 'primary', 'primary', 'primary']);

    component.songForm.get('stars').setValue(2);
    component.starsChanged();

    expect(component.stars).toEqual(['primary', 'primary', 'black', 'black', 'black']);

    component.songForm.get('stars').setValue(4);
    component.starsChanged();

    expect(component.stars).toEqual(['primary', 'primary', 'primary', 'primary', 'black']);

    component.songForm.get('stars').setValue(1);
    component.starsChanged();

    expect(component.stars).toEqual(['primary', 'black', 'black', 'black', 'black']);

    component.songForm.get('stars').setValue(0);
    component.starsChanged();

    expect(component.stars).toEqual(['black', 'black', 'black', 'black', 'black']);
  });

  it('should handle a resetForm event', () => {
    fixture.detectChanges();
    const originalSong = {
      id: 2222,
      title: 'title - changed',
      artist: 'artist - changed',
      stars: 1
    };
    component.song = originalSong;

    component.songForm.setValue(
      Object.assign(component.songForm.value, {
        id: 2222,
        title: 'title - changed',
        artist: 'artist - changed',
        stars: 2
      })
    );

    expect(component.songForm.value).toEqual({
      id: 2222,
      title: 'title - changed',
      artist: 'artist - changed',
      stars: 2
    });

    component.starsChanged();

    expect(component.stars).toEqual(['primary', 'primary', 'black', 'black', 'black']);

    component.resetForm();

    expect(component.songForm.value).toEqual(originalSong);

    expect(component.stars).toEqual(['primary', 'black', 'black', 'black', 'black']);
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
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
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
    expect(component.stars).toEqual(Array(5).fill('black'));

    fixture.detectChanges();

    expect(component.song.id).toBe(0);

    expect(component.songForm.value).toEqual(<Song>{
      id: 0,
      title: '',
      artist: '',
      stars: 0
    });

    expect(component.stars).toEqual(['black', 'black', 'black', 'black', 'black']);

    component.songForm.setValue(
      Object.assign(component.songForm.value, {
        title: 'New Song',
        artist: 'new Artist',
        stars: 2
      })
    );

    component.save();

    const request = httpMock.expectOne('http://localhost:3000/api/songs');
    expect(request.request.body).toEqual({
      id: 0,
      title: 'New Song',
      artist: 'new Artist',
      stars: 2
    });
    expect(request.request.method).toEqual('POST');
    request.flush({
      id: 1,
      title: 'New Song - Response',
      artist: 'New Artist - Response',
      stars: 1111
    });

    expect(component.song).toEqual(
      Object({
        id: 1,
        title: 'New Song - Response',
        artist: 'New Artist - Response',
        stars: 1111
      })
    );

    expect(component.songForm.value).toEqual(
      Object({
        id: 1,
        title: 'New Song - Response',
        artist: 'New Artist - Response',
        stars: 1111
      })
    );
  }));

  it(
    'should test save whenStable',
    fakeAsync(() => {
      expect(component.song).toEqual(new Song());

      fixture.detectChanges();
      tick(1501);

      component.songForm.get('title').setValue('New Artist');

      component.save();

      tick(1501);
      expect(locationServiceSpy.back).toHaveBeenCalledWith();
    })
  );
});

describe('SongDetailComponent with Fake Data', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;
  let locationServiceSpy;

  beforeEach(async(() => {
    locationServiceSpy = jasmine.createSpyObj('Location', ['back']);
    locationServiceSpy.back.and.returnValue(22);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
          dataEncapsulation: false,
          delay: 1500
        }),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
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

  it(
    'should test getSong whenStable',
    fakeAsync(() => {
      expect(component.song).toEqual(new Song());
      expect(component.stars).toEqual(Array(5).fill('black'));

      fixture.detectChanges();
      tick(1501);

      fixture.whenStable().then(() => {
        expect(component.song).toEqual({
          id: 1,
          title: 'Africa',
          artist: 'Toto',
          stars: 1
        });

        expect(component.songForm.value).toEqual({
          id: 1,
          title: 'Africa',
          artist: 'Toto',
          stars: 1
        });

        expect(component.stars).toEqual(['primary', 'black', 'black', 'black', 'black']);
      });
    })
  );
});
