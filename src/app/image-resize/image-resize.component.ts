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
  @ViewChild('resizeBox', { read: ElementRef })
  resizeBox: ElementRef;
  private currentElementRef: ElementRef;

  constructor() {}

  ngOnInit() {}

  @HostListener('drag', ['$event'])
  drag($event: any): void {
    if ($event.target.className === 'topIcon') {
      this.currentElementRef = this.topIcon;
    }
    this.currentElementRef.nativeElement.style.left = `${$event.screenX}px`;
    this.currentElementRef.nativeElement.style.top = `${$event.screenY}px`;
  }
}
