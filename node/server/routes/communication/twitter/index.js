const Twitter = require('twitter');
const twitterConfiguration = require('../../../../lib/secrets/twitter_configuration');
const router = require('express').Router();
const cors = require('cors');
const corsOptions = require('../../../libs/cors');

var client = new Twitter(twitterConfiguration);

router.get('', cors(corsOptions), function(req, res) {
  const allTweets = [];
  client.get('statuses/user_timeline.json?screen_name=kanikapilas&count=2', function(error, tweets) {
    if (error) throw error;
    tweets.forEach(tweet => {
      allTweets.push({
        tweet: tweet.text,
        created: tweet.created_at
      });
    });

    res.status(200).json(allTweets);
  });
});

/*
client.get('account/settings', function(error, tweets, response) {
  if(error) {
    console.log(error);
    throw error
  };
  console.log(tweets);  // The favorites.
  //console.log(response);  // Raw response object.
});
*/

/*
*/

/*
client.post('statuses/update', {status: 'Welcome to Kanikapilas.com. The Ultimate Collection of Ukulele Songs! #kanikapilas #ukulele!'}).then(function (tweet) {
  console.log(tweet);
}).catch(function (error) {
  console.log('Error:', error);
  throw error;
})
*/

module.exports = router;
