import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpStatusService } from '../http/http-status.service';
import { finalize, tap } from 'rxjs/internal/operators';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(private httpStatusService: HttpStatusService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(() => {
        this.httpStatusService.emitHttpStatus(true);
      }),
      finalize(() => {
        this.httpStatusService.emitHttpStatus(false);
      })
    );
  }
}
