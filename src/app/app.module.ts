import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ImageProcessingComponent } from './image-processing/image-processing.component';
import { ImageProcessingService } from './image-processing/services/image-processing.service';
import { LoadingSpinnerComponent } from './http/spinner/loading-spinner/loading-spinner.component';
import { HttpStatusService } from './http/http-status.service';
import { AuthenticationInterceptorService } from './authentication/authentication-interceptor.service';
import { TwitterComponent } from './communication/twitter/twitter.component';
import { TwitterService } from 'node/server/communication/services/twitter.service';

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
  providers: [
    HttpStatusService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    },
    ImageProcessingService,
    LastFmService,
    SongsService,
    TwitterService
  ],
  declarations: [
    AppComponent,
    ImageProcessingComponent,
    ImageResizeComponent,
    LastFmComponent,
    LoadingSpinnerComponent,
    SongDetailComponent,
    SongGenreComponent,
    SongsComponent,
    ToolbarComponent,
    TwitterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
