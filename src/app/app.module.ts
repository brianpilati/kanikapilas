import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongsComponent } from './songs/songs.component';
import { SongsService } from './songs-service/songs.service';
import { UkuleleRoutingModule } from './ukulele-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    UkuleleRoutingModule
  ],
  providers: [ SongsService ],
  declarations: [ AppComponent, SongDetailComponent, SongsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
