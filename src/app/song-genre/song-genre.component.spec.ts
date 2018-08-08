import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongGenreComponent } from './song-genre.component';

describe('SongGenreComponent', () => {
  let component: SongGenreComponent;
  let fixture: ComponentFixture<SongGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SongGenreComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
