import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { SongsComponent } from './songs/songs.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/songs',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent 
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
