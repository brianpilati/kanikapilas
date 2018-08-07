import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from '../app/models/song';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const songs = [
      <Song>{
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1,
        flowered: false,
        genre: 'Pop'
      },
      <Song>{
        id: 2,
        title: 'Manic Monday',
        artist: 'The Bangles',
        stars: 2,
        flowered: true,
        genre: '80s'
      }
    ];
    return { songs };
  }
}
