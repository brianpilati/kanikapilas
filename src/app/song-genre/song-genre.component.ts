import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-song-genre',
  templateUrl: './song-genre.component.html',
  styleUrls: ['./song-genre.component.css']
})
export class SongGenreComponent implements OnInit {
  @Input()
  genre: string;

  @Output()
  delete = new EventEmitter<string>();

  deleteGenre() {
    this.delete.emit(this.genre);
  }

  constructor() {}

  ngOnInit() {}
}
