import { Tweet } from '../app/models/tweets';

export const TestTweets = [
  <Tweet>{
    id: 1,
    created: 'now',
    tweet: 'The First',
    truncated: false
  },
  <Tweet>{
    id: 2,
    created: 'later',
    tweet: 'The Second',
    truncated: true
  }
];
