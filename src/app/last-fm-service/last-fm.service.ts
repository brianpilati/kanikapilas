import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { lastfm } from '../../environments/keys';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {
  private apiUrl = `http://ws.audioscrobbler.com/2.0/?api_key=${lastfm.key}&format=json`;

  constructor(private http: HttpClient) {}

  getArtist(artist: string): Observable<any[]> {
    return this.http
      .get(`${this.apiUrl}&method=artist.gettopalbums&artist=${artist}`)
      .pipe(map(albums => albums['topalbums']['album']));
  }

  getAlbum(album: string): Observable<any[]> {
    console.log('service', album);
    return this.http.get(`${this.apiUrl}&method=album.search&album=${album}`).pipe(
      map(albums => albums['results']['albummatches']['album']),
      catchError((error, caught) => {
        console.log(error);
        return of(error);
      }) as any
    );
  }
}
