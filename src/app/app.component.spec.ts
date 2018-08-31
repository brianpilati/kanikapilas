import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { LoadingSpinnerComponent } from './http/spinner/loading-spinner/loading-spinner.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, RouterTestingModule],
      declarations: [AppComponent, LoadingSpinnerComponent, ToolbarComponent]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
