import { Song } from '../app/models/song';

export const TestSongs = [
  <Song>{
    id: 1,
    title: 'Africa',
    artist: 'Toto',
    stars: 1,
    flowered: false,
    genre: 'Pop, 80s',
    imageName: 'africa',
    imageTop: 10,
    imageBottom: 20
  },
  <Song>{
    id: 2,
    title: 'Manic Monday',
    artist: 'The Bangles',
    stars: 2,
    flowered: true,
    genre: '80s',
    imageName: 'manic_monday',
    imageTop: 100,
    imageBottom: 300
  }
];
