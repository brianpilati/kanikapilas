import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


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
    AngularFireDatabaseModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule;