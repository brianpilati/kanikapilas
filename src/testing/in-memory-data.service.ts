import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const songs = [
      { id: 1, title: 'Africa', artist: 'Toto' },
      { id: 2, title: 'Manic Monday', artist: 'The Bangles' }
    ];
    return {songs};
  }
}