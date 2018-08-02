import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SongsService } from './songs.service';

describe('SongsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [SongsService]
    });
  });

  it('should be created', inject([SongsService], (service: SongsService) => {
    expect(service).toBeTruthy();
  }));
});
