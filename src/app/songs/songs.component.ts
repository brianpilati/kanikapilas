import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SongsService } from '../songs-service/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit {
  title = 'hello';

  songs: any[];
  sortedSongs: Promise<any>;
  user: any;
  constructor(private songService: SongsService) {
    this.user = {};
  }

  ngOnInit() {
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
    });
  }

  /*
  sortSong(letter: string): void {
    this.songService.getSortedSongs(letter).then(sortedSongs => {
      this.sortedSongs = sortedSongs;
      console.log('sorted songs: ', this.sortedSongs);
    });
  }
  */
}
