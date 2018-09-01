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
    firstNote: 1,
    capo: 0,
    imageTop: 10,
    imageBottom: 20,
    coverArtUrl: 'http://toto/africa/coverart.png',
    titlePrefix: '',
    octave: 'none',
    chords: 'g.png, f.png'
  },
  <Song>{
    id: 2,
    title: 'Manic Monday',
    artist: 'The Bangles',
    stars: 2,
    flowered: true,
    genre: '80s',
    imageName: 'manic_monday',
    firstNote: 2,
    capo: 1,
    imageTop: 100,
    imageBottom: 300,
    coverArtUrl: 'http://the-bangles/manic-monday/coverart.png',
    titlePrefix: 'The',
    octave: 'highter',
    chords: 'c.png, d.png'
  }
];
