import { Song } from '../app/models/song';

export const TestSongs = [
  <Song>{
    id: 1,
    titlePrefix: '',
    title: 'Africa',
    artistPrefix: '',
    artist: 'Toto',
    active: true,
    stars: 1,
    flowered: false,
    capo: 0,
    genre: 'Pop, 80s',
    firstNote: 1,
    imageName: 'africa',
    imageTop: 10,
    imageBottom: 20,
    coverArtUrl: 'http://toto/africa/coverart.png',
    octave: 'None',
    chords: 'g.png, f.png'
  },
  <Song>{
    id: 2,
    titlePrefix: 'The',
    title: 'Manic Monday',
    artistPrefix: 'The',
    artist: 'Bangles',
    active: false,
    stars: 2,
    flowered: true,
    capo: 1,
    genre: '80s',
    firstNote: 2,
    imageName: 'manic_monday',
    imageTop: 100,
    imageBottom: 300,
    coverArtUrl: 'http://the-bangles/manic-monday/coverart.png',
    octave: 'Higher',
    chords: 'c.png, d.png'
  }
];
