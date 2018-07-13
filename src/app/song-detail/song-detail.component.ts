import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song = {};
  showError = false;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {}

  ngOnInit(): void {
    this.getSong();
  }

  getSong(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('detail', id);
    this.db.doc(`songs/${id}`).valueChanges().subscribe(_song_ => {
        this.song = _song_;
        console.log(3222, _song_, this.song);
      }, error => {
        this.showError = true;
        console.log('sweet', error);
      });
  }
}
