import { InMemoryDbService } from 'angular-in-memory-web-api';

import { TestSongs as songs } from './test-songs';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { songs };
  }
}
