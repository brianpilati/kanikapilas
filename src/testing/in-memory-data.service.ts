import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const songs = [
      {
        id: 1,
        title: 'Africa',
        artist: 'Toto',
        stars: 1
      },
      {
        id: 2,
        title: 'Manic Monday',
        artist: 'The Bangles',
        stars: 2
      }
    ];
    return { songs };
  }
}
