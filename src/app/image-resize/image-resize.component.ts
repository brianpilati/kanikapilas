import { Component, OnInit, HostListener, ContentChild, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-resize',
  templateUrl: './image-resize.component.html',
  styleUrls: ['./image-resize.component.css']
})
export class ImageResizeComponent implements OnInit {
  @ViewChild('topIcon', { read: ElementRef })
  topIcon: ElementRef;
  @ViewChild('bottomIcon', { read: ElementRef })
  bottomIcon: ElementRef;

  @ViewChild('resizeBox')
  resizeBox: ElementRef;

  constructor() {}

  ngOnInit() {}

  movingOffset(offset: any): void {
    this.resizeBox.nativeElement.style.top = `${offset.y}px`;
  }
}
