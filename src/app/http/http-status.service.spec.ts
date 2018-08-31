import { TestBed, inject } from '@angular/core/testing';

import { HttpStatusService } from './http-status.service';

describe('HttpStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpStatusService]
    });
  });

  it('should be created', inject([HttpStatusService], (service: HttpStatusService) => {
    expect(service).toBeTruthy();
  }));
});
