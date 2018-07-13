import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { SongsService } from '../songs-service/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit {
  title = 'hello';

  songs: Observable<any[]>;
  user: any;
  constructor(db: AngularFirestore, afAuth: AngularFireAuth, private userAuthentication: UserAuthenticationService,
  private songService: SongsService) {
    this.user = {};
  }

  ngOnInit() {
    this.userAuthentication.getUser().subscribe(user => {
      this.user = user;
    });
    this.songs = this.songService.getSongs();
  }
}
