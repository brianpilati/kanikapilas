import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ImageCoordinates } from '../models/image-coordinates';

@Component({
  selector: 'app-image-resize',
  templateUrl: './image-resize.component.html',
  styleUrls: ['./image-resize.component.css']
})
export class ImageResizeComponent implements OnInit {
  @ViewChild('resizeBox')
  resizeBox: ElementRef;
  @ViewChild('topIcon')
  topIcon: ElementRef;
  @ViewChild('bottomIcon')
  bottomIcon: ElementRef;
  private bottomOffset: number;
  private topOffset: number;
  private boundaryOffset = 12.5;

  @Input()
  coordinates: EventEmitter<ImageCoordinates>;

  @Output()
  resize = new EventEmitter<ImageCoordinates>();

  constructor() {}

  ngOnInit() {
    this.coordinates.subscribe((coordinates: ImageCoordinates) => {
      this.setTopCoordinate(coordinates);
      this.setBottomCoordinate(coordinates);
    });
  }

  setTopCoordinate(coordinates: ImageCoordinates): void {
    this.topIcon.nativeElement.style.top = `${coordinates.top - this.boundaryOffset}px`;
    this.topIcon.nativeElement.style.left = `${coordinates.left}px`;

    this.topOffset = coordinates.top;
    this.resizeBox.nativeElement.style.top = `${coordinates.top}px`;
  }

  setBottomCoordinate(coordinates: ImageCoordinates): void {
    this.bottomIcon.nativeElement.style.bottom = `${coordinates.bottom - this.boundaryOffset}px`;
    this.bottomIcon.nativeElement.style.right = `${coordinates.right}px`;

    this.bottomOffset = -1 * coordinates.bottom;
    this.resizeBox.nativeElement.style.bottom = `${coordinates.bottom}px`;
  }

  movingTopOffset(offset: any): void {
    this.resizeBox.nativeElement.style.top = `${offset.y + this.topOffset}px`;
  }

  movingBottomOffset(offset: any): void {
    this.resizeBox.nativeElement.style.bottom = `${-1 * offset.y - this.bottomOffset}px`;
  }

  private convertCoordinate(coordinate: string, isTop: boolean = true): number {
    const newNumber = parseInt(coordinate.replace('px', '') || '0', 10);

    if (newNumber % 2) {
      return isTop ? newNumber - 1 : newNumber + 1;
    }
    return newNumber;
  }

  stoppedMoving(): void {
    const style = this.resizeBox.nativeElement.style;
    this.resize.emit(<ImageCoordinates>{
      top: this.convertCoordinate(style.top),
      left: 0,
      right: 0,
      bottom: this.convertCoordinate(style.bottom, false)
    });
  }
}