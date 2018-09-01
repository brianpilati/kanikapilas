import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../models/file.model';
import { ImageProcessingService } from './services/image-processing.service';
import { ImageProcessingModel } from '../models/image-processing.model';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ImageCoordinates } from '../models/image-coordinates';

@Component({
  selector: 'app-image-processing',
  templateUrl: './image-processing.component.html',
  styleUrls: ['./image-processing.component.css']
})
export class ImageProcessingComponent implements OnInit, AfterViewInit {
  public imageProcessingForm: FormGroup;
  public carouselPhotos: FileModel[];

  @Output()
  coordinates = new EventEmitter<ImageCoordinates>();

  constructor(
    private imageProcessingService: ImageProcessingService,
    private formatBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.imageProcessingForm = this.formatBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      imageName: ['', [Validators.required, Validators.maxLength(255)]],
      fileName: ['', [Validators.required, Validators.maxLength(255)]],
      artist: ['', [Validators.required, Validators.maxLength(255)]],
      imageTop: [0, Validators.min(1)],
      imageBottom: [0, Validators.min(1)]
    });
  }

  ngOnInit() {
    this.imageProcessingService.getFiles().subscribe(files => {
      this.carouselPhotos = files;
    });

    this.imageProcessingForm
      .get('title')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(title => this.imageProcessingForm.get('imageName').setValue(`${title}.png`));
  }

  ngAfterViewInit() {
    this.coordinates.emit(<ImageCoordinates>{
      top: 75,
      bottom: 12.5,
      left: 37.5,
      right: 12.5
    });
  }

  saveFile() {
    if (this.imageProcessingForm.valid) {
      const imageProcessingModel = <ImageProcessingModel>this.imageProcessingForm.value;
      this.imageProcessingService
        .saveFile(imageProcessingModel)
        .subscribe(song => this.router.navigate([`songs/${song.id}`]));
    }
  }

  selectedTab(tabNumber): void {
    this.imageProcessingForm.get('fileName').setValue(this.carouselPhotos[tabNumber].fileName);
  }

  resetForm() {
    this.imageProcessingForm.reset();
  }

  resize(coordinates: ImageCoordinates): void {
    this.imageProcessingForm.get('imageTop').setValue(coordinates.top);
    this.imageProcessingForm.get('imageBottom').setValue(coordinates.bottom);
  }
}
