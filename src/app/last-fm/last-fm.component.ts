import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, map } from 'rxjs/operators';
import { LastFmService } from '../last-fm-service/last-fm.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-last-fm',
  templateUrl: './last-fm.component.html',
  styleUrls: ['./last-fm.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class LastFmComponent implements OnInit {
  @Output()
  coverArtImageUrl = new EventEmitter<string>();

  @Input()
  track: EventEmitter<string>;

  @Input()
  artist: EventEmitter<string>;

  public displayAlbums = false;
  public displayArtists = false;
  public displayFindByTrackButton = false;

  public coverArtForm: FormGroup;
  private album$: Observable<string>;

  albumSource: any[];
  artistSource: any[];
  displayedAlbumColumns: string[] = ['name', 'artist'];
  displayedArtistColumns: string[] = ['name'];
  expandedAlbum: any;

  constructor(private formatBuilder: FormBuilder, private lastFmService: LastFmService) {
    this.createForm();
  }

  createForm() {
    this.coverArtForm = this.formatBuilder.group({
      album: '',
      artist: ['', Validators.required],
      track: ['', Validators.required]
    });

    this.album$ = this.coverArtForm.get('album').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
  }

  ngOnInit(): void {
    this.album$.subscribe(album => {
      this.lastFmService.getAlbum(album).subscribe(results => {
        this.displayAlbums = true;
        this.displayArtists = false;
        this.displayFindByTrackButton = false;
        this.albumSource = results;
      });
    });

    this.track.subscribe(track => this.coverArtForm.get('track').setValue(track));
    this.artist.subscribe(artist => this.coverArtForm.get('artist').setValue(artist));
  }

  setImageUrl(images: string[]): void {
    this.coverArtImageUrl.emit(images[2]['#text']);
  }

  findByTrack(trackMbid: string): void {
    this.lastFmService.getTrack(trackMbid).subscribe(images => this.setImageUrl(images));
  }

  searchArtist(): void {
    const artist = this.coverArtForm.get('artist').value;
    this.lastFmService.getArtist(artist).subscribe(results => {
      this.displayAlbums = false;
      this.displayArtists = true;
      this.displayFindByTrackButton = false;
      this.artistSource = results;
    });
  }

  searchTrack(): void {
    const track = this.coverArtForm.get('track').value;
    const artist = this.coverArtForm.get('artist').value;

    if (this.coverArtForm.valid) {
      this.lastFmService.getTracks(track, artist).subscribe(results => {
        this.displayAlbums = true;
        this.displayArtists = false;
        this.displayFindByTrackButton = true;
        this.albumSource = results;
      });
    }
  }
}
