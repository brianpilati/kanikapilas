import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  users: Observable<any[]>;
  user: any;
  constructor(db: AngularFirestore, afAuth: AngularFireAuth) {
    this.users = db.collection('users').valueChanges();
    this.user = {};

    console.log(this.users);

    afAuth.auth.createUserWithEmailAndPassword('brian1@gmail.com', '12345678').then(res => {
      console.log('there', res);
    }, error => {
      console.log('here');
    }
    );


    afAuth.auth.signInWithEmailAndPassword('brianpilati@gmail.com', '12345678').then( res => {
      console.log('sign in 1', res);
      console.log('sign in 2', res.user.uid);
      const user = {
        id: res.user.uid,
        firstName: 'test1'
      };

      console.log('is this old?');
      db.doc('users/' + res.user.uid).valueChanges().subscribe(_user_ => {
        this.user = _user_;
        console.log(_user_);
        console.log(_user_['firstName']);
        console.log(this.user, this.user.firstName);
      });
      /*
      db.collection('users').doc(res.user.uid).set(user).then(resuser => {
        console.log('added', resuser);
      }, error => {
        console.log('error', error);
      });
      */

    }, error => {
      console.log('sign in error');
    });
  }
}
