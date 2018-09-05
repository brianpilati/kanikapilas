import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizeComponent } from './image-resize.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { EventEmitter } from '@angular/core';
import { ImageCoordinates } from '../models/image-coordinates';

describe('ImageResizeComponent', () => {
  let component: ImageResizeComponent;
  let fixture: ComponentFixture<ImageResizeComponent>;
  const coordinates = new EventEmitter<ImageCoordinates>();

  function emitCoordinates() {
    coordinates.emit(<ImageCoordinates>{
      top: 20,
      bottom: 200,
      left: 20,
      right: 200
    });
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularDraggableModule],
      declarations: [ImageResizeComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ImageResizeComponent);
        component = fixture.componentInstance;
        component.coordinates = coordinates;
        fixture.detectChanges();
      });
  }));

  it('should verify default values', () => {
    emitCoordinates();

    expect(component.topIcon.nativeElement.style.top).toBe('0.5px');
    expect(component.topIcon.nativeElement.style.left).toBe('20px');
    expect(component.resizeBox.nativeElement.style.top).toBe('13px');

    expect(component.bottomIcon.nativeElement.style.bottom).toBe('99.5px');
    expect(component.bottomIcon.nativeElement.style.right).toBe('200px');
    expect(component.resizeBox.nativeElement.style.bottom).toBe('114px');
  });

  it('should verify movingTopOffset values', () => {
    emitCoordinates();
    component.movingTopOffset({ y: 20, x: 10 });
    expect(component.resizeBox.nativeElement.style.top).toBe('33px');
  });

  it('should verify movingBottomOffset values', () => {
    emitCoordinates();
    component.movingBottomOffset({ y: 20, x: 10 });
    expect(component.resizeBox.nativeElement.style.bottom).toBe('92px');
  });

  describe('stoppedMoving', () => {
    it('should verify stoppedMoving values - even', () => {
      let testCoordinates: ImageCoordinates;
      component.resizeBox.nativeElement.style.top = '100px';
      component.resizeBox.nativeElement.style.bottom = '400px';
      component.resize.subscribe((_coordinates_: ImageCoordinates) => {
        testCoordinates = _coordinates_;
      });

      component.stoppedMoving();
      expect(testCoordinates).toEqual(<ImageCoordinates>{
        top: 160,
        left: 0,
        right: 0,
        bottom: 640
      });
    });

    it('should verify stoppedMoving values - odd', () => {
      let testCoordinates: ImageCoordinates;
      component.resizeBox.nativeElement.style.top = '101px';
      component.resizeBox.nativeElement.style.bottom = '401px';
      component.resize.subscribe((_coordinates_: ImageCoordinates) => {
        testCoordinates = _coordinates_;
      });

      component.stoppedMoving();
      expect(testCoordinates).toEqual(<ImageCoordinates>{
        top: 160,
        left: 0,
        right: 0,
        bottom: 643
      });
    });

    it('should verify stoppedMoving values - empty', () => {
      let testCoordinates: ImageCoordinates;
      component.resize.subscribe((_coordinates_: ImageCoordinates) => {
        testCoordinates = _coordinates_;
      });

      component.stoppedMoving();
      expect(testCoordinates).toEqual(<ImageCoordinates>{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      });
    });
  });
});

describe('ImageResizeComponent - no coordinates', () => {
  let component: ImageResizeComponent;
  let fixture: ComponentFixture<ImageResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularDraggableModule],
      declarations: [ImageResizeComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ImageResizeComponent);
        component = fixture.componentInstance;
        component.fullImage = true;
        fixture.detectChanges();
      });
  }));

  it('should verify default values', () => {
    expect(component.topIcon.nativeElement.style.top).toBe('');
    expect(component.topIcon.nativeElement.style.left).toBe('');
    expect(component.resizeBox.nativeElement.style.top).toBe('');

    expect(component.bottomIcon.nativeElement.style.bottom).toBe('');
    expect(component.bottomIcon.nativeElement.style.right).toBe('');
    expect(component.resizeBox.nativeElement.style.bottom).toBe('');
  });

  it('should verify stoppedMoving values - even', () => {
    let testCoordinates: ImageCoordinates;
    component.resizeBox.nativeElement.style.top = '100px';
    component.resizeBox.nativeElement.style.bottom = '400px';
    component.resize.subscribe((_coordinates_: ImageCoordinates) => {
      testCoordinates = _coordinates_;
    });

    component.stoppedMoving();
    expect(testCoordinates).toEqual(<ImageCoordinates>{
      top: 128,
      left: 0,
      right: 0,
      bottom: 529
    });
  });
});
