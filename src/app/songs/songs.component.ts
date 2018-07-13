import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent {
  title = 'hello';

  songs: Observable<any[]>;
  user: any;
  constructor(db: AngularFirestore, afAuth: AngularFireAuth) {

    /*
    afAuth.auth.createUserWithEmailAndPassword('brian1@gmail.com', '12345678').then(res => {
      console.log('there', res);
    }, error => {
      console.log('here');
    }
    );
    */

    this.user = {};

    // 4s2DhhKj6CfxWwdfZ7MfDrSkyyt1
    afAuth.auth.signInWithEmailAndPassword('brianpilati@gmail.com', '12345678').then( res => {
      console.log('sign in 1', res);
      console.log('sign in 2', res.user.uid);
      const user = {
        id: res.user.uid,
        firstName: 'test1'
      };

      console.log('is this old?');
      db.doc('users/' + res.user.uid).valueChanges().subscribe(_user_ => {
      // db.doc('users/222').valueChanges().subscribe(_user_ => {
        this.user = _user_;
        console.log(1, _user_);
        console.log(2, _user_['firstName']);
        console.log(3, this.user, this.user.firstName);
      });

      // db.collection('users').doc(res.user.uid).set(user).then(resuser => {
      // db.collection('users').doc('2222222').set(user).then(resuser => {
        /*
      db.collection('users').doc('444444').set(user).then(resuser => {
        console.log('added', resuser);
      }, error => {
        console.log('error', error);
      });
      */

      /*
      db.collection('songs').valueChanges().subscribe(_songs_ => {
        this.songs = _songs_;
        console.log(_songs_);
      });
      */

      this.songs = db.collection('songs').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return Object.assign({ uid: id}, data);
          });
        })
      );

      console.log(1, this.songs);

    }, error => {
      console.log('sign in error');
    });
  }
}
