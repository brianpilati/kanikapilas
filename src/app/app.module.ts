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
  MatAutocompleteModule,
  MatTabsModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongsComponent } from './songs/songs.component';
import { SongsService } from './songs-service/songs.service';
import { UkuleleRoutingModule } from './ukulele-routing.module';
import { SongGenreComponent } from './song-genre/song-genre.component';
import { ImageResizeComponent } from './image-resize/image-resize.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { LastFmComponent } from './last-fm/last-fm.component';
import { LastFmService } from './last-fm-service/last-fm.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    AngularDraggableModule,
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
    MatMenuModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    UkuleleRoutingModule
  ],
  providers: [LastFmService, SongsService],
  declarations: [
    AppComponent,
    ImageResizeComponent,
    LastFmComponent,
    SongDetailComponent,
    SongGenreComponent,
    SongsComponent,
    ToolbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
