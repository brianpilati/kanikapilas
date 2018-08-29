import { TestBed, inject } from '@angular/core/testing';

import { ImageProgressingService } from './image-processing.service';

describe('ImageProgressingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageProgressingService]
    });
  });

  it('should be created', inject([ImageProgressingService], (service: ImageProgressingService) => {
    expect(service).toBeTruthy();
  }));
});
