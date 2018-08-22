import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  public coverArtForm: FormGroup;
  private artist$: Observable<string>;
  private album$: Observable<string>;

  artistResults$: Observable<any[]>;
  albumSource: any[];
  displayedColumns: string[] = ['name', 'artist'];
  expandedAlbum: any;

  constructor(private formatBuilder: FormBuilder, private lastFmService: LastFmService) {
    this.createForm();
  }

  createForm() {
    this.coverArtForm = this.formatBuilder.group({
      artist: '',
      album: ''
    });

    this.artist$ = this.coverArtForm.get('artist').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    this.album$ = this.coverArtForm.get('album').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
  }

  ngOnInit(): void {
    this.artist$.subscribe(artist => {
      this.artistResults$ = this.lastFmService.getArtist(artist);
    });

    this.album$.subscribe(album => {
      this.lastFmService.getAlbum(album).subscribe(results => {
        this.albumSource = results;
        console.log(results);
      });
    });
  }

  setImageUrl(images: string[]): void {
    console.log(images);
  }
}
