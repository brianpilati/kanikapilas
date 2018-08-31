import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoadingSpinnerComponent } from './loading-spinner.component';
import { HttpStatusService } from '../../http-status.service';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingSpinnerComponent],
      providers: [HttpStatusService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoadingSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should test animationDone and animationLoading', () => {
    expect(component.animationLoading()).toBe('right');
    component.animationDone();
    expect(component.animationLoading()).toBe('left');
    component.animationDone();
    expect(component.animationLoading()).toBe('right');
  });

  it('should test httpStatusSubscription', inject([HttpStatusService], (httpStatusService: HttpStatusService) => {
    expect(component.isVisible).toBe(false);
    httpStatusService.emitHttpStatus(true);
    expect(component.isVisible).toBe(true);
    httpStatusService.emitHttpStatus(false);
    expect(component.isVisible).toBe(false);
  }));
});
