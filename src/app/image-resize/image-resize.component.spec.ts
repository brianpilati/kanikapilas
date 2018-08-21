import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizeComponent } from './image-resize.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { EventEmitter } from '@angular/core';
import { ImageCoordinates } from '../models/image-coordinates';

describe('ImageResizeComponent', () => {
  let component: ImageResizeComponent;
  let fixture: ComponentFixture<ImageResizeComponent>;
  let coordinates = new EventEmitter<ImageCoordinates>();

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

    expect(component.topIcon.nativeElement.style.top).toBe('0px');
    expect(component.topIcon.nativeElement.style.left).toBe('12.5px');
    expect(component.resizeBox.nativeElement.style.top).toBe('12.5px');

    expect(component.bottomIcon.nativeElement.style.bottom).toBe('112.5px');
    expect(component.bottomIcon.nativeElement.style.right).toBe('125px');
    expect(component.resizeBox.nativeElement.style.bottom).toBe('125px');
  });

  it('should verify movingTopOffset values', () => {
    emitCoordinates();
    component.movingTopOffset({ y: 20, x: 10 });
    expect(component.resizeBox.nativeElement.style.top).toBe('32.5px');
  });

  it('should verify movingBottomOffset values', () => {
    emitCoordinates();
    component.movingBottomOffset({ y: 20, x: 10 });
    expect(component.resizeBox.nativeElement.style.bottom).toBe('105px');
  });

  it('should verify stoppedMoving values', () => {
    let coordinates: ImageCoordinates;
    component.resizeBox.nativeElement.style.top = '100px';
    component.resizeBox.nativeElement.style.bottom = '400px';
    component.resize.subscribe((_coordinates_: ImageCoordinates) => {
      coordinates = _coordinates_;
    });

    component.stoppedMoving();
    expect(coordinates).toEqual(<ImageCoordinates>{
      top: 160,
      left: 0,
      right: 0,
      bottom: 640
    });
  });
});
