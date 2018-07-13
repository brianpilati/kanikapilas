import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  userAuthenticatedQuery: Promise<firebase.auth.UserCredential>;
  private userSubject = new Subject();

  constructor(
    private firebaseAuthentication: AngularFireAuth,
    private firebaseDb: AngularFirestore
  ) {
    this.getLoggedInUser();
   }

  authenticateUser(): Promise<firebase.auth.UserCredential> {
    if (!this.userAuthenticatedQuery) {
      this.userAuthenticatedQuery = this.firebaseAuthentication.auth.signInWithEmailAndPassword('brianpilati@gmail.com', '12345678');
    }

    return this.userAuthenticatedQuery;
  }

  private getLoggedInUser(): any {
    this.authenticateUser().then((user: firebase.auth.UserCredential) => {
      this.firebaseDb.collection('users').doc(user.user.uid).valueChanges().subscribe(_user_ => {
        this.userSubject.next(_user_);
      });
    });
  }

  getUser(): Subject<any> {
    return this.userSubject;
  }



    /*
    afAuth.auth.createUserWithEmailAndPassword('brian1@gmail.com', '12345678').then(res => {
      console.log('there', res);
    }, error => {
      console.log('here');
    }
    );
    */
}
