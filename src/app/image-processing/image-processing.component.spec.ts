import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { ImageProcessingComponent } from './image-processing.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { FileModel } from '../models/file.model';
import { MatCardModule, MatFormFieldModule, MatTabsModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ImageResizeComponent } from '../image-resize/image-resize.component';
import { AngularDraggableModule } from 'angular2-draggable';

describe('ImageProcessingComponent', () => {
  let component: ImageProcessingComponent;
  let fixture: ComponentFixture<ImageProcessingComponent>;
  let navigationUrl: string;

  beforeEach(
    fakeAsync(() => {
      navigationUrl = 'not set';
      TestBed.configureTestingModule({
        imports: [
          AngularDraggableModule,
          FormsModule,
          HttpClientTestingModule,
          MatButtonModule,
          MatCardModule,
          MatFormFieldModule,
          MatInputModule,
          MatTabsModule,
          NoopAnimationsModule,
          ReactiveFormsModule,
          RouterTestingModule
        ],
        providers: [
          {
            provide: DomSanitizer,
            useValue: {
              bypassSecurityTrustResourceUrl: function(url) {
                return url;
              }
            }
          },
          {
            provide: Router,
            useValue: {
              navigate: function(_url_) {
                navigationUrl = _url_;
              }
            }
          }
        ],
        declarations: [ImageResizeComponent, ImageProcessingComponent]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(ImageProcessingComponent);
          component = fixture.componentInstance;
        });
    })
  );

  it('should have default values', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    fixture.detectChanges();

    const request = httpMock.expectOne('http://localhost:3000/api/image-processing');
    expect(request.request.method).toEqual('GET');
    request.flush(['fileName']);

    expect(component.carouselPhotos).toEqual([
      <FileModel>{
        fileName: 'fileName',
        description: 'fileName',
        uri: 'http://localhost:3000/local/unprocessed/fileName'
      }
    ]);
  }));

  it(
    'should test title changes ',
    fakeAsync(() => {
      fixture.detectChanges();
      component.imageProcessingForm.get('title').setValue('new title');

      expect(component.imageProcessingForm.get('imageName').value).toBe('');

      tick(500);

      expect(component.imageProcessingForm.get('imageName').value).toBe('new title.png');
    })
  );

  it('should test selectedTab', () => {
    component.carouselPhotos = Object({
      22: Object({
        fileName: 'fileName - set'
      })
    });
    component.selectedTab(22);

    expect(component.imageProcessingForm.get('fileName').value).toBe('fileName - set');
  });

  it('should test resize', () => {
    component.resize(
      Object({
        top: 33,
        bottom: 22
      })
    );

    expect(component.imageProcessingForm.get('imageBottom').value).toBe(22);
    expect(component.imageProcessingForm.get('imageTop').value).toBe(33);
  });

  it('should test resetForm', () => {
    component.imageProcessingForm.setValue({
      title: 'title',
      imageName: 'imageName',
      fileName: 'fileName',
      artist: 'artist',
      imageTop: 10,
      imageBottom: 20
    });

    expect(component.imageProcessingForm.value).toEqual({
      title: 'title',
      imageName: 'imageName',
      fileName: 'fileName',
      artist: 'artist',
      imageTop: 10,
      imageBottom: 20
    });

    component.resetForm();

    expect(component.imageProcessingForm.value).toEqual({
      title: null,
      imageName: null,
      fileName: null,
      artist: null,
      imageTop: null,
      imageBottom: null
    });
  });

  describe('saveFile', () => {
    it('should test saveFile', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      component.imageProcessingForm.setValue({
        title: 'title',
        imageName: 'imageName',
        fileName: 'fileName',
        artist: 'artist',
        imageTop: 10,
        imageBottom: 20
      });

      component.saveFile();

      const request = httpMock.expectOne('http://localhost:3000/api/image-processing');
      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(
        Object({
          title: 'title',
          imageName: 'imageName',
          fileName: 'fileName',
          artist: 'artist',
          imageTop: 10,
          imageBottom: 20
        })
      );

      request.flush({
        id: 22
      });

      expect(navigationUrl).toEqual(['songs/22']);
    }));

    it('should test an invalid saveFile', inject([HttpTestingController], (httpMock: HttpTestingController) => {
      component.resetForm();

      component.saveFile();

      const request = httpMock.expectNone('http://localhost:3000/api/image-processing');

      expect(navigationUrl).toBe('not set');
    }));
  });
});
