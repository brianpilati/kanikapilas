import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SongsService } from '../songs-service/songs.service';
import { Song } from '../models/song';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  @Input()
  song: Song;

  public stars: boolean[];
  public genres: string[];
  public songForm: FormGroup;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(
    private formatBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private songsService: SongsService
  ) {
    this.stars = Array(5).fill(false);
    this.song = new Song();
    this.createForm();
  }

  createForm() {
    this.songForm = this.formatBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      artist: ['', Validators.required],
      stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      flowered: [false, Validators.required],
      genre: ['', Validators.required],
      searchTerm: ''
    });
  }

  ngOnInit(): void {
    this.getSong();

    this.filteredOptions = this.songForm.get('searchTerm').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private parseGenre(): void {
    const dbConstants = this.songForm.get('genre').value;
    this.genres = dbConstants.split(/,\s/g);
  }

  private setSongValues(): void {
    this.songForm.setValue(Object.assign(this.songForm.value, this.song));

    this.starsChanged();
    this.parseGenre();
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
      starArray[$index] = $index < this.songForm.get('stars').value;
    });
  }

  searchTermSelected(): void {
    const currentGenre = this.songForm.get('genre').value;
    const searchTerm = this.songForm.get('searchTerm').value;
    if (currentGenre.length > 0) {
      this.songForm.get('genre').setValue(`${currentGenre}, ${searchTerm}`);
    } else {
      this.songForm.get('genre').setValue(`${searchTerm}`);
    }
    this.parseGenre();
    this.songForm.get('searchTerm').reset();
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
