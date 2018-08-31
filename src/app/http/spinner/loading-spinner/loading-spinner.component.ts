import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpStatusService } from '../../http-status.service';
import { Subscription } from 'rxjs';

const transitionSpeed = '1000ms';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
  animations: [
    trigger('loadingState', [
      state(
        'left',
        style({
          left: '-305px'
        })
      ),
      state(
        'right',
        style({
          left: '100vw'
        })
      ),
      transition('left <=> right', animate(`${transitionSpeed} ease-in`))
    ])
  ]
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  private httpStatusSubscription: Subscription;
  public isVisible = false;

  private toggle = true;

  constructor(httpStatusService: HttpStatusService) {
    this.httpStatusSubscription = httpStatusService
      .getHttpStatusSubject()
      .subscribe(status => (this.isVisible = status));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.httpStatusSubscription.unsubscribe();
  }

  animationDone(): void {
    this.toggle = !this.toggle;
  }

  animateLoading(): string {
    return this.toggle ? 'right' : 'left';
  }
}
