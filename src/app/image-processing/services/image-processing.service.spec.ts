import { TestBed, inject } from '@angular/core/testing';

import { ImageProcessingService } from './image-processing.service';

describe('ImageProgressingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageProcessingService]
    });
  });

  it('should be created', inject([ImageProcessingService], (service: ImageProcessingService) => {
    expect(service).toBeTruthy();
  }));
});
