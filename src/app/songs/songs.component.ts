import { Component, OnInit } from '@angular/core';
import { SongsService } from '../songs-service/songs.service';
import { Song } from '../models/song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  sortedSongs: Song[];
  songTitles: string[];

  constructor(private songService: SongsService) {}

  ngOnInit() {
    this.songService.getSongByFirstLetter().subscribe(songTitles => {
      this.songTitles = songTitles;
      console.log(songTitles);
    });
  }

  sortSongs(letter: string): void {
    this.songService.getSortedSongs(letter).subscribe(sortedSongs => {
      this.sortedSongs = sortedSongs;
    });
  }
}
