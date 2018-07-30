import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { Observable, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  songs: Observable<any[]>;

  constructor(
    private firebaseDb: AngularFirestore,
    private router: Router
  ) { }

  getSongs(): Observable<any[]> {
    if (!this.songs) {
      this.songs = this.firebaseDb.collection('songs').snapshotChanges().pipe(
        map(actions => {
          return actions.map(song => {
            return Object.assign({ uid: song.payload.doc.id}, song.payload.doc.data());
          });
        })
      );
    }

    return this.songs;
  }

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
}
