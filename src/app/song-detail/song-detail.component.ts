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

  public songForm: FormGroup;

  constructor(
    private formatBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private songsService: SongsService
  ) {
    this.song = new Song();
    this.createForm();
  }

  createForm() {
    this.songForm = this.formatBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      artist: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getSong();
  }

  private setSongValues(): void {
    this.songForm.setValue(Object.assign(this.songForm.value, this.song));
  }

  private getSong(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.songsService.getSong(id).subscribe(song => {
      this.song = song;
      this.setSongValues();
    });
  }

  goBack(): void {
    this.location.back();
  }

  resetForm(): void {
    this.setSongValues();
  }

  save(): void {
    if (this.songForm.valid) {
      this.songsService.updateSong(<Song>this.songForm.value).subscribe(() => this.goBack());
    }
  }
}
