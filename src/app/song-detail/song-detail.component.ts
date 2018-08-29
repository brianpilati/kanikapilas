import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { SongsService } from '../songs-service/songs.service';
import { Song } from '../models/song';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ImageCoordinates } from '../models/image-coordinates';
import { FirstNotes } from '../models/first-notes';
import { FirstNotesConstants } from '../constants/first-notes-constants';
import { GenreConstants } from '../constants/genre-constants';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  @Input()
  song: Song;

  @Output()
  coordinates = new EventEmitter<ImageCoordinates>();

  @Output()
  track = new EventEmitter<string>();

  @Output()
  artist = new EventEmitter<string>();

  public stars: boolean[];
  public genres: string[];
  public songForm: FormGroup;
  private genreOptions: string[] = GenreConstants;
  private isNewSong = true;

  firstNoteOptions: FirstNotes[] = FirstNotesConstants;

  filteredGenres: Observable<string[]>;
  filteredFirstNotes: Observable<FirstNotes[]>;

  constructor(
    private formatBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private songsService: SongsService,
    private sanitizer: DomSanitizer
  ) {
    this.genres = [];
    this.stars = Array(5).fill(false);
    this.song = new Song();
    this.createForm();
  }

  createForm() {
    this.songForm = this.formatBuilder.group({
      id: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      artist: ['', [Validators.required, Validators.maxLength(255)]],
      stars: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      flowered: ['false', Validators.required],
      genre: ['', Validators.required],
      firstNote: ['', Validators.required],
      capo: [0, Validators.required],
      imageName: ['', [Validators.required, Validators.maxLength(355)]],
      genreSearchTerm: '',
      createdDate: '',
      imageTop: [0, Validators.min(0)],
      imageBottom: [0, Validators.min(0)],
      coverArtUrl: ['', [Validators.required, Validators.maxLength(255)]]
    });

    this.songForm.get('title').valueChanges.subscribe(title => this.track.emit(title));

    this.songForm.get('artist').valueChanges.subscribe(artist => this.artist.emit(artist));
  }

  ngOnInit(): void {
    this.getSong();

    this.filteredGenres = this.songForm.get('genreSearchTerm').valueChanges.pipe(
      startWith(''),
      map(value => this._genreFilter(value))
    );
  }

  private _genreFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.genreOptions
      .filter(option => this.genres.indexOf(option) < 0)
      .filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
      this.emitImageCoordinates();
    } else {
      this.songsService.getSong(id).subscribe(song => {
        this.song = song;
        this.isNewSong = song.imageBottom === null;
        this.setSongValues();
        this.emitImageCoordinates();
      });
    }
  }

  private emitImageCoordinates(): void {
    this.coordinates.emit(<ImageCoordinates>{
      top: this.songForm.get('imageTop').value,
      bottom: this.songForm.get('imageBottom').value,
      left: 37.5,
      right: 212.5
    });
  }

  goBack(): void {
    this.router.navigate(['songs']);
  }

  resetForm(): void {
    this.setSongValues();
  }

  starsChanged(): void {
    this.stars.forEach((star, $index, starArray) => {
      starArray[$index] = $index < this.songForm.get('stars').value;
    });
  }

  private getArtistFirstLetter(): string {
    return this.songForm
      .get('artist')
      .value.charAt(0)
      .toLowerCase();
  }

  private buildFileName(name: string): string {
    if (name) {
      return name.replace(/\s+/g, '-').toLowerCase();
    }
  }

  private isImagePathValid(path: string): boolean {
    return path.match(/undefined/g) === null;
  }

  private buildDirectoryPath(): string {
    const artistName = this.songForm.get('artist').value;
    const title = this.songForm.get('title').value;
    return `${this.getArtistFirstLetter()}/${this.buildFileName(artistName)}/${this.buildFileName(title)}`;
  }

  private buildImagePath(location: string): string {
    const fileExtension = location !== '' ? `_${location}` : '';
    return `assets/${this.buildDirectoryPath()}${fileExtension}.png`;
  }

  getImageUrlPath(location: string, isLocal: boolean = false): any {
    let imagePath = 'http://localhost:3000';
    imagePath += isLocal ? '/local' : '';
    imagePath += `/${this.buildImagePath(location)}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.isImagePathValid(imagePath) ? imagePath : '');
  }

  getImageAssetSrc(): string {
    return this.getImageUrlPath('', true);
  }

  getImageDeploymentSrc(location): SafeResourceUrl {
    return this.isNewSong ? '' : this.getImageUrlPath(location);
  }

  updateImageName(): void {
    if (this.songForm.get('imageName').value === '') {
      this.songForm.get('imageName').setValue(
        `${this.songForm
          .get('title')
          .value.replace(/\s+/g, '_')
          .toLowerCase()}.png`
      );
    }
  }

  private parseGenre(): void {
    const dbConstants = this.songForm.get('genre').value;
    if (dbConstants !== null) {
      this.genres = dbConstants.split(/,\s/g);
    }
  }

  deleteGenre(deleteInput: string): void {
    const genreRegex = new RegExp(`(,\\s${deleteInput})|(${deleteInput}(,\\s)?)`, 'g');
    this.songForm.get('genre').setValue(this.songForm.get('genre').value.replace(genreRegex, ''));

    this.parseGenre();
  }

  genreSearchTermSelected(): void {
    const currentGenre = this.songForm.get('genre').value || '';
    const genreSearchTerm = this.songForm.get('genreSearchTerm').value;
    if (currentGenre.match(genreSearchTerm) === null) {
      if (currentGenre.length > 0) {
        this.songForm.get('genre').setValue(`${currentGenre}, ${genreSearchTerm}`);
      } else {
        this.songForm.get('genre').setValue(`${genreSearchTerm}`);
      }
      this.parseGenre();
    }
    this.songForm.get('genreSearchTerm').setValue('');
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

  resize(coordinates: ImageCoordinates): void {
    this.songForm.get('imageTop').setValue(coordinates.top);
    this.songForm.get('imageBottom').setValue(coordinates.bottom);
  }

  setCoverArt(coverArtImageUrl: string): void {
    this.songForm.get('coverArtUrl').setValue(coverArtImageUrl);
  }
}
