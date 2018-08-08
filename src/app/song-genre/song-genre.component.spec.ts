import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongGenreComponent } from './song-genre.component';
import { MatIconModule } from '../../../node_modules/@angular/material';

describe('SongGenreComponent', () => {
  let component: SongGenreComponent;
  let fixture: ComponentFixture<SongGenreComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [SongGenreComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SongGenreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        compiled = fixture.debugElement.nativeElement;
      });
  }));

  it('should have a genre', () => {
    component.genre = 'Hello World';
    fixture.detectChanges();
    const genreContainer = compiled.querySelector('[name="genreContainer"]');
    expect(genreContainer.textContent.trim()).toBe('Hello World');
  });

  it('should have a remove container', () => {
    const genreContainer = compiled.querySelector('.genre-delete');
    expect(genreContainer.textContent.trim()).toBe('delete');
  });

  it('should handle remove container click', () => {
    component.genre = 'Pop';

    const genreContainer = compiled.querySelector('.genre-delete');
    genreContainer.click();

    component.delete.subscribe($event => {
      expect($event).toBe('Pop');
    });
  });
});
