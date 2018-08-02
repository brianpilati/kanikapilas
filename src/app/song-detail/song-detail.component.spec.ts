import { tick, async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../../testing/in-memory-data.service';

import { SongDetailComponent } from './song-detail.component';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Song } from '../models/song';

const activatedRouteMock =  {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ SongDetailComponent ],
      providers: [ 
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
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test getSong', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
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

  it('should test getSongImage',() => {
      expect(component.getSongImage()).toBe('assets/africa.png');
  });
});

describe('SongDetailComponent with Fake Data', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { 
            dataEncapsulation: false,
            delay: 1500 
           }
        ),
         RouterTestingModule
      ],
      declarations: [ SongDetailComponent ],
      providers: [ 
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test getSong whenStable', fakeAsync(() => {
    expect(component.song).toEqual(new Song());

    fixture.detectChanges();
    tick(1501);

    fixture.whenStable().then(() => {
      expect(component.song).toEqual({ id: 1, title: 'Africa', artist: 'Toto' });
    });
  }));
});
