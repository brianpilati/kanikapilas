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
  sortedSongs: Song[];

  constructor(private songService: SongsService) {
    this.songs = [];
    this.sortedSongs = [];
  }

  ngOnInit() {
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
    });
  }

  sortSongs(letter: string): void {
    this.songService.getSortedSongs(letter).subscribe(sortedSongs => {
      this.sortedSongs = sortedSongs;
    });
  }
}
