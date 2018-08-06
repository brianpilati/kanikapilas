import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, map, catchError, tap } from 'rxjs/operators';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private songsCache$: Observable<Song[]>;
  private apiUrl = 'http://localhost:3000/api/songs'; // URL to web api
  private CACHE_SIZE = 1;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router) {}

  getSongs(): Observable<Song[]> {
    if (!this.songsCache$) {
      this.songsCache$ = this.requestSongs().pipe(shareReplay(this.CACHE_SIZE));
    }

    return this.songsCache$;
  }

  requestSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl}`).pipe(
      tap(songs => this.log('fetched songs')) // ,
      // catchError(this.handleError('getSongs - error', []))
    );
  }

  getSortedSongs(letter: string): Observable<Song[]> {
    return this.getSongs().pipe(map(songs => songs.filter(song => new RegExp(`^${letter}`, 'i').test(song.title))));
  }

  getSongByFirstLetter(): Observable<string[]> {
    return this.getSongs().pipe<string[]>(
      map(songs => songs.map(song => song.title.charAt(0).toUpperCase())),
      map(songs => {
        return songs.sort();
      })
    );
  }

  getSong(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/${id}`).pipe(
      tap(song => this.log('fetched song')) // ,
      // catchError(this.handleError('getSong - error', []))
    );
  }

  saveSong(song: Song): Observable<Song> {
    return this.http.post<Song>(`${this.apiUrl}`, song, this.httpOptions);
    /*
      .pipe(
        // tap(_ => this.errorHandlingService.log('HeroService', `updated hero id=${hero.id}`)),
        catchError(this.handleError('getSong - error', []))
      );
      */
  }

  updateSong(song: Song): Observable<Song> {
    return this.http.put<Song>(`${this.apiUrl}`, song, this.httpOptions);
    /*
      .pipe(
        // tap(_ => this.errorHandlingService.log('HeroService', `updated hero id=${hero.id}`)),
        catchError(this.handleError('getSong - error', []))
      );
      */
  }

  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
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
*/
}
