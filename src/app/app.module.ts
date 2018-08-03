import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongsComponent } from './songs/songs.component';
import { SongsService } from './songs-service/songs.service';
import { UkuleleRoutingModule } from './ukulele-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    UkuleleRoutingModule
  ],
  providers: [SongsService],
  declarations: [AppComponent, SongDetailComponent, SongsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
