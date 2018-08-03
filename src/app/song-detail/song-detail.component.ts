import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SongsService } from '../songs-service/songs.service';
import { Song } from '../models/song';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  @Input()
  song: Song;

  constructor(private route: ActivatedRoute, private location: Location, private songsService: SongsService) {
    this.song = new Song();
  }

  ngOnInit(): void {
    this.getSong();
  }

  private getSong(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.songsService.getSong(id).subscribe(song => {
      this.song = song;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.songsService.updateSong(this.song).subscribe(() => this.goBack());
  }
}
