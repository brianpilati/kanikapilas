import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFmComponent } from './last-fm.component';
import { MatTableModule } from '@angular/material';

describe('LastFmComponent', () => {
  let component: LastFmComponent;
  let fixture: ComponentFixture<LastFmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [LastFmComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastFmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
