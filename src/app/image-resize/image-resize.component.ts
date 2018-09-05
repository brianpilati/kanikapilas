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

  @ViewChild('image')
  image: ElementRef;

  @ViewChild('bottomIcon')
  bottomIcon: ElementRef;
  private bottomOffset = 0;
  private topOffset = 0;
  private boundaryOffset = 12.5;
  private borderOffset = 2;

  @Input()
  coordinates: EventEmitter<ImageCoordinates>;

  @Input()
  fullImage: boolean;

  @Output()
  resize = new EventEmitter<ImageCoordinates>();

  constructor() {}

  ngOnInit() {
    if (this.coordinates !== undefined) {
      this.coordinates.subscribe((coordinates: ImageCoordinates) => {
        this.setTopCoordinate(this.resizeCoordinates(coordinates, false));
        this.setBottomCoordinate(this.resizeCoordinates(coordinates, false));
      });
    }
  }

  private grow(): number {
    return this.fullImage ? 1035 / 800 : 1.6;
  }

  private shrink(): number {
    return this.fullImage ? 800 / 1035 : 0.625;
  }

  private scale(coordinate: number, grow: boolean): number {
    return Math.round(coordinate * (grow ? this.grow() : this.shrink()));
  }

  private fullImageConversion(coordinates: ImageCoordinates): ImageCoordinates {
    if (this.fullImage) {
      coordinates.top = this.convertOddNumber(coordinates.top - this.topOffset);
      coordinates.bottom = this.convertOddNumber(coordinates.bottom - (this.topOffset - this.boundaryOffset));
      return coordinates;
    }

    return coordinates;
  }

  resizeCoordinates(coordinates: ImageCoordinates, grow: boolean = true): ImageCoordinates {
    return this.fullImageConversion(<ImageCoordinates>{
      top: this.scale(coordinates.top, grow),
      left: coordinates.left,
      right: coordinates.right,
      bottom: this.scale(coordinates.bottom, grow)
    });
  }

  setTopCoordinate(coordinates: ImageCoordinates): void {
    this.topIcon.nativeElement.style.top = `${coordinates.top - this.boundaryOffset}px`;
    this.topIcon.nativeElement.style.left = `${coordinates.left}px`;

    this.topOffset = coordinates.top;
    this.resizeBox.nativeElement.style.top = `${coordinates.top}px`;
  }

  setBottomCoordinate(coordinates: ImageCoordinates): void {
    this.bottomIcon.nativeElement.style.bottom = `${coordinates.bottom - this.boundaryOffset - coordinates.top}px`;
    this.bottomIcon.nativeElement.style.right = `${coordinates.right}px`;

    this.bottomOffset = -1 * (coordinates.bottom - coordinates.top);
    this.resizeBox.nativeElement.style.bottom = `${coordinates.bottom - (coordinates.top - this.borderOffset)}px`;
  }

  movingTopOffset(offset: any): void {
    this.resizeBox.nativeElement.style.top = `${offset.y + this.topOffset}px`;
  }

  movingBottomOffset(offset: any): void {
    this.resizeBox.nativeElement.style.bottom = `${-1 * offset.y - this.bottomOffset}px`;
  }

  private convertOddNumber(newNumber: number, isTop: boolean = true) {
    if (newNumber % 2) {
      newNumber += isTop ? -1 : +1;
    }
    return Math.floor(newNumber);
  }

  private convertCoordinate(coordinate: string, isTop: boolean = true): number {
    const newNumber = parseInt(coordinate.replace('px', '') || '0', 10);

    return this.convertOddNumber(newNumber, isTop);
  }

  stoppedMoving(): void {
    const style = this.resizeBox.nativeElement.style;
    this.resize.emit(
      this.resizeCoordinates(<ImageCoordinates>{
        top: this.convertCoordinate(style.top),
        left: 0,
        right: 0,
        bottom: this.convertCoordinate(style.bottom, false)
      })
    );
  }
}
