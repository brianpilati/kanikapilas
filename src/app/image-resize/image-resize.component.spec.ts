import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageResizeComponent } from './image-resize.component';
import { AngularDraggableModule } from 'angular2-draggable';

describe('ImageResizeComponent', () => {
  let component: ImageResizeComponent;
  let fixture: ComponentFixture<ImageResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularDraggableModule],
      declarations: [ImageResizeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
