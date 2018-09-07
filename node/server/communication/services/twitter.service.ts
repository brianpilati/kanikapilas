import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tweet } from 'src/app/models/tweets';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private apiUrl = 'http://localhost:3000/api/twitter';

  constructor(private http: HttpClient) {}

  getTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(`${this.apiUrl}`);
  }
}
