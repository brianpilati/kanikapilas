import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizeComponent } from './image-resize.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { ImageCoordinates } from '../models/image-coordinates';

describe('ImageResizeComponent', () => {
  let component: ImageResizeComponent;
  let fixture: ComponentFixture<ImageResizeComponent>;
  let coordinates = new EventEmitter<ImageCoordinates>();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularDraggableModule],
      declarations: [ImageResizeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageResizeComponent);
    component = fixture.componentInstance;
    component.coordinates = coordinates;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
