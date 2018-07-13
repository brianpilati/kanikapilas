import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongsComponent } from './songs/songs.component';
import { SongsService } from './songs-service/songs.service';
import { UkuleleRoutingModule } from './ukulele-routing.module';
import { UserAuthenticationService } from './user-authentication/user-authentication.service';
import { LoginComponent } from './login/login.component';


const config = {
  apiKey: 'AIzaSyAFADgc-KtYG7pdWWTifDULBfyY4_l_guU',
  authDomain: 'books-by-beb.firebaseapp.com',
  databaseURL: 'https://books-by-beb.firebaseio.com',
  projectId: 'books-by-beb',
  storageBucket: '',
  messagingSenderId: '79367172579'
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    UkuleleRoutingModule
  ],
  providers: [ AngularFirestore, AngularFireAuth, SongsService, UserAuthenticationService ],
  declarations: [ AppComponent, SongDetailComponent, SongsComponent, LoginComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
