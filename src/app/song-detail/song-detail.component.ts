import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from '../songs-service/songs.service';
import { Song } from '../models/song';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song: Song;
  showError = false;

  constructor(private route: ActivatedRoute, private songsService: SongsService) {
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

  getSongImage(): string {
    return 'assets/africa.png';
  }
}
