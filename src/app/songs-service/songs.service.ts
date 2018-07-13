import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { Observable, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';

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

  getSong(id: string): any {
    return this.firebaseDb.doc(`songs/${id}`).valueChanges().pipe(
      map(_song_ => { console.log(_song_); return _song_; }),
      catchError(error => { console.log(error);  this.router.navigate(['/login']); return empty(); })
    );
  }
}
