import { tick, fakeAsync, async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SongsComponent } from './songs.component';
import { TestSongs } from '../../testing/test-songs';
import { MatCardModule } from '@angular/material';

describe('SongsComponent', () => {
  let component: SongsComponent;
  let fixture: ComponentFixture<SongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [SongsComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SongsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

    expect(component.sortedSongs).toEqual([{ id: 1, title: 'Africa', artist: 'Toto', stars: 1 }]);
  }));
});
