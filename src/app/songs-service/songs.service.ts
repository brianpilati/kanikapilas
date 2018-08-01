import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, empty, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  songs: Observable<any[]>;
  private apiUrl = 'api';  // URL to web api


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getSongs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/songs`)
      .pipe(
        catchError(this.handleError('getSongs', []))
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

  getSong(id: string): any {
    return this.firebaseDb.doc(`songs/${id}`).valueChanges().pipe(
      map(_song_ => { console.log(_song_); return _song_; }),
      catchError(error => { console.log(error);  this.router.navigate(['/login']); return empty(); })
    );
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
    console.log(`HeroService: ${message}`);
  }
}
