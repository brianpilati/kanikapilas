import { TestBed, inject } from '@angular/core/testing';

import { ImageProcessingService } from './image-processing.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FileModel } from '../../models/file.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageProcessingModel } from '../../models/image-processing.model';

fdescribe('ImageProgressingService', () => {
  let imageProcessingService: ImageProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ImageProcessingService,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: function(url) {
              return url;
            }
          }
        }
      ]
    });
  });

  beforeEach(inject([ImageProcessingService], (service: ImageProcessingService) => {
    imageProcessingService = service;
  }));

  it('should test getFiles', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    let getFileResult: FileModel[];
    imageProcessingService.getFiles().subscribe(files => {
      getFileResult = files;
    });

    const request = httpMock.expectOne('http://localhost:3000/api/image-processing');
    expect(request.request.method).toEqual('GET');
    request.flush(['fileName']);

    expect(getFileResult).toEqual([
      <FileModel>{
        fileName: 'fileName',
        description: 'fileName',
        uri: 'http://localhost:3000/local/unprocessed/fileName'
      }
    ]);
  }));

  it('should test saveFile', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const data = <ImageProcessingModel>{
      title: 'title',
      artist: 'artist',
      imageName: 'imageName',
      fileName: 'fileName'
    };

    imageProcessingService.saveFile(data).subscribe();

    const request = httpMock.expectOne('http://localhost:3000/api/image-processing');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(data);
  }));
});
