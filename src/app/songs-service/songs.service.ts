import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private songsCache$: Observable<any[]>;
  private apiUrl = 'http://localhost:3000/api/songs';  // URL to web api
  private CACHE_SIZE = 1;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getSongs(): Observable<any[]> {
    if (!this.songsCache$) {
      this.songsCache$ = this.requestSongs().pipe(
        shareReplay(this.CACHE_SIZE)
      )
    }

    return this.songsCache$;
  }

  getSong(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(song => this.log('fetched song')),
        catchError(this.handleError('getSong - error', []))
      );
  }

  requestSongs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
      .pipe(
        tap(songs => this.log('fetched songs')),
        catchError(this.handleError('getSongs - error', []))
      );
  }
  /*

  getSortedSongs(letter: string): Promise<any> {
    console.log('letter', letter);
    const songs = [];
    return this.firebaseDb.firestore.collection('songs').orderBy('title').startAt(letter).endAt(letter + '~').get().then(collection => {
      console.log(collection);
      collection.forEach((song) => {
        console.log(song.id, song.data());
        songs.push(Object.assign({
          uid: song.id},
          song.data()
        ));
      });

      return songs;
    });
  }

  */

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(`SongService: ${message}`);
  }
}
