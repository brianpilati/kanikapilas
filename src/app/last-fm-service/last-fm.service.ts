import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastfm } from '../../environments/keys';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {
  private apiUrl = `http://ws.audioscrobbler.com/2.0/?api_key=${lastfm.key}&format=json`;

  constructor(private http: HttpClient) {}

  getArtist(artist: string): Observable<any[]> {
    return this.http
      .get(`${this.apiUrl}&method=artist.gettopalbums&artist=${artist}`)
      .pipe(map(albums => albums['topalbums']['album'].filter(album => album['mbid'] !== '')));
  }

  getAlbum(album: string): Observable<any[]> {
    return this.http
      .get(`${this.apiUrl}&method=album.search&album=${album}`)
      .pipe(map(albums => albums['results']['albummatches']['album'].filter(_album_ => _album_['mbid'] !== '')));
  }

  getTracks(track: string, artist: string): Observable<any[]> {
    return this.http
      .get(`${this.apiUrl}&method=track.search&track=${track}&artist=${artist}`)
      .pipe(map(tracks => tracks['results']['trackmatches']['track'].filter(_track_ => _track_['mbid'] !== '')));
  }

  getTrack(trackMbid: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}&method=track.getInfo&mbid=${trackMbid}`)
      .pipe(map(track => track['track']['album']['image']));
  }
}
