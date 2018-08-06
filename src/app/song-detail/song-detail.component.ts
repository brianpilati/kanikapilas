import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public stars: string[];
  public songForm: FormGroup;

  constructor(
    private formatBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private songsService: SongsService
  ) {
    this.stars = Array(5).fill('black');
    this.song = new Song();
    this.createForm();
  }

  createForm() {
    this.songForm = this.formatBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      artist: ['', Validators.required],
      stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    this.getSong();
  }

  private setSongValues(): void {
    this.songForm.setValue(Object.assign(this.songForm.value, this.song));

    this.starsChanged();
  }

  private getSong(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.song = new Song();
      this.song.stars = 0;
      this.song.id = 0;
      this.setSongValues();
    } else {
      this.songsService.getSong(id).subscribe(song => {
        this.song = song;
        this.setSongValues();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  resetForm(): void {
    this.setSongValues();
  }

  starsChanged(): void {
    this.stars.forEach((star, $index, starArray) => {
      starArray[$index] = $index < this.songForm.get('stars').value ? 'primary' : 'black';
    });
  }

  save(): void {
    if (this.songForm.valid) {
      const requestSong = <Song>this.songForm.value;
      if (this.songForm.get('id').value === 0) {
        this.songsService.saveSong(requestSong).subscribe(responseSong => {
          this.song = responseSong;
          this.setSongValues();
        });
      } else {
        this.songsService.updateSong(requestSong).subscribe(() => this.goBack());
      }
    }
  }
}
