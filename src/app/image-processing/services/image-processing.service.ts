import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileModel } from '../../models/file.model';
import { map } from 'rxjs/operators';
import { ImageProcessingModel } from '../../models/image-processing.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {
  private apiImageUrl = 'http://localhost:3000/api/image-processing';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  private sanitizeImage(file) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:3000/local/unprocessed/${file}`);
  }

  getFiles(): Observable<FileModel[]> {
    return this.http.get<string[]>(`${this.apiImageUrl}`).pipe(
      map(files => {
        return files.map(file => {
          return <FileModel>{
            fileName: file,
            description: file,
            uri: this.sanitizeImage(file)
          };
        });
      })
    );
  }

  saveFile(data: ImageProcessingModel): Observable<any> {
    return this.http.post(`${this.apiImageUrl}`, data);
  }
}
