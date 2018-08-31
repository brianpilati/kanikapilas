import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpStatusService {
  private httpStatusSubject = new Subject<boolean>();

  constructor() {}

  getHttpStatusSubject(): Subject<boolean> {
    return this.httpStatusSubject;
  }

  emitHttpStatus(value: boolean): void {
    this.httpStatusSubject.next(value);
  }
}
