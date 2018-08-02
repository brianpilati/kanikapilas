import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SongDetailComponent } from './song-detail.component';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

describe('SongDetailComponent', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ SongDetailComponent ],
      providers: [ 
        { 
          provide: ActivatedRoute, 
          useValue: {
            snapshot: {
              paramMap: {
                get: function() {
                  return 1;
                }
              }
            }
          } 
        } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test getSong', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      expect(component.song).toEqual({});

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
