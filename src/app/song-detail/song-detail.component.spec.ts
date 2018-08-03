import { tick, async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../../testing/in-memory-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SongDetailComponent } from './song-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../models/song';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { NoopAnimationsModule } from '../../../node_modules/@angular/platform-browser/animations';

const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get: function() {
        return 1;
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test getSong', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component.song).toEqual(new Song());

    const request = httpMock.expectOne('http://localhost:3000/api/songs/1');
    expect(request.request.method).toEqual('GET');
    request.flush({
      id: 1,
      title: 'Africa',
      artist: 'Toto'
    });

    expect(component.song).toEqual({ id: 1, title: 'Africa', artist: 'Toto' });
  }));

  describe('save', () => {
    it('should test save - valid', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      let request = httpMock.expectOne('http://localhost:3000/api/songs/1');
      expect(request.request.method).toEqual('GET');
      request.flush({
        id: 1,
        title: 'Africa',
        artist: 'Toto'
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
        artist: 'Toto'
      });
      expect(request.request.method).toEqual('PUT');

      fixture.whenStable().then(() => {
        expect(component.song).toEqual(
          Object({
            id: 1,
            title: 'Africa',
            artist: 'Toto'
          })
        );

        expect(component.songForm.value).toEqual(
          Object({
            id: 1,
            title: 'brian',
            artist: 'Toto'
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
        artist: 'Toto'
      });
      fixture.detectChanges();

      component.songForm.get('title').setValue('');

      component.save();

      httpMock.expectNone('http://localhost:3000/api/songs');

      expect(component.songForm.value).toEqual(
        Object({
          id: 1,
          title: '',
          artist: 'Toto'
        })
      );
    }));
  });

  it('should handle a resetForm event', () => {
    fixture.detectChanges();
    const originalSong = {
      id: 2222,
      title: 'title - changed',
      artist: 'artist - changed'
    };
    component.song = originalSong;

    component.songForm.setValue(
      Object.assign(component.songForm.value, {
        id: 2222,
        title: 'title - changed',
        artist: 'artist - changed'
      })
    );

    expect(component.songForm.value).toEqual({
      id: 2222,
      title: 'title - changed',
      artist: 'artist - changed'
    });

    component.resetForm();

    expect(component.songForm.value).toEqual(originalSong);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should test getSong whenStable',
    fakeAsync(() => {
      expect(component.song).toEqual(new Song());

      fixture.detectChanges();
      tick(1501);

      fixture.whenStable().then(() => {
        expect(component.song).toEqual({ id: 1, title: 'Africa', artist: 'Toto' });

        expect(component.songForm.value).toEqual({ id: 1, title: 'Africa', artist: 'Toto' });
      });
    })
  );

  it(
    'should test save whenStable',
    fakeAsync(() => {
      expect(component.song).toEqual(new Song());

      fixture.detectChanges();
      tick(1501);

      component.save();

      tick(1501);
      expect(locationServiceSpy.back).toHaveBeenCalledWith();
    })
  );
});
