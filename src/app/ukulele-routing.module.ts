import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongsComponent } from './songs/songs.component';
import { ImageProcessingComponent } from './image-processing/image-processing.component';
import { TwitterComponent } from './communication/twitter/twitter.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/songs',
    pathMatch: 'full'
  },
  {
    path: 'image-processing',
    component: ImageProcessingComponent
  },
  {
    path: 'twitter',
    component: TwitterComponent
  },
  {
    path: 'songs',
    component: SongsComponent
  },
  {
    path: 'songs/:id',
    component: SongDetailComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class UkuleleRoutingModule {}
