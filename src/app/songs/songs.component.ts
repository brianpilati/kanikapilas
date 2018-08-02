import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs-service/songs.service';
import { Song } from '../models/song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit {
  songs: Song[];
  sortedSongs: Promise<any>;

  constructor(private songService: SongsService) { 
    this.songs = [];
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
