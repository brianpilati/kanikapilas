import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'node/server/communication/services/twitter.service';
import { Tweet } from 'src/app/models/tweets';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {
  tweets: Tweet[];
  displayedColumns: string[] = ['tweet', 'truncated', 'created'];

  constructor(private twitterService: TwitterService) {}

  ngOnInit() {
    this.twitterService.getTweets().subscribe(tweets => (this.tweets = tweets));
  }
}
