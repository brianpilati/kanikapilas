import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../models/file.model';
import { ImageProcessingService } from './services/image-processing.service';
import { ImageProcessingModel } from '../models/image-processing.model';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-image-processing',
  templateUrl: './image-processing.component.html',
  styleUrls: ['./image-processing.component.css']
})
export class ImageProcessingComponent implements OnInit {
  public imageProcessingForm: FormGroup;

  public carouselPhotos: FileModel[];

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
      artist: ['', [Validators.required, Validators.maxLength(255)]]
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

  clearForm() {
    this.imageProcessingForm.reset();
  }
}
