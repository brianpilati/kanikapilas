import { TestBed, inject } from '@angular/core/testing';

import { HttpStatusService } from './http-status.service';

fdescribe('HttpStatusService', () => {
  let httpStatusService: HttpStatusService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpStatusService]
    });
  });

  beforeEach(inject([HttpStatusService], (service: HttpStatusService) => {
    httpStatusService = service;
  }));

  it('should test get and emit', () => {
    let emittedStatus = false;

    httpStatusService.getHttpStatusSubject().subscribe(result => (emittedStatus = result));

    httpStatusService.emitHttpStatus(true);

    expect(emittedStatus).toBe(true);
  });
});
