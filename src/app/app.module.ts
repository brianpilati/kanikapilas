import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSliderModule,
  MatCardModule,
  MatSlideToggleModule,
  MatAutocompleteModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongsComponent } from './songs/songs.component';
import { SongsService } from './songs-service/songs.service';
import { UkuleleRoutingModule } from './ukulele-routing.module';
import { SongGenreComponent } from './song-genre/song-genre.component';
import { ImageResizeComponent } from './image-resize/image-resize.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    UkuleleRoutingModule
  ],
  providers: [SongsService],
  declarations: [AppComponent, ImageResizeComponent, SongDetailComponent, SongGenreComponent, SongsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
