import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileModel } from '../models/file.model';
import { ImageProgressingService } from './services/image-progressing.service';

@Component({
  selector: 'app-image-processing',
  templateUrl: './image-processing.component.html',
  styleUrls: ['./image-processing.component.css']
})
export class ImageProcessingComponent implements OnInit {
  public fileUploadForm: FormGroup;

  @ViewChild('fileInput')
  fileInput: ElementRef;
  public carouselPhotos: FileModel[];
  fileDataUri = '';
  errorMsg = '';
  selectedTab = 0;
  isLoading = true;
  disabled = true;

  constructor(private imageProgressingService: ImageProgressingService, private formatBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.fileUploadForm = this.formatBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(255)]],
      file: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.fileUploadService.getFiles().subscribe(files => {
      this.isLoading = false;
      this.carouselPhotos = files;
      if (files.length === 0) {
        this.selectedTab = 1;
      } else {
        this.disabled = false;
      }
    });
  }

  private clearForm() {
    this.fileDataUri = '';
    this.fileInput.nativeElement.value = '';
    this.errorMsg = '';
    this.fileUploadForm.reset();
  }
}
