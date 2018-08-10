const siteName = 'Kanikapilas.com';
const nowDateTime = getFormattedDate();

function buildArticleTags(genres) {
  if (genres) {
    let articleTags = '';
    genres.split(/,\s/g).forEach(function(genre) {
      articleTags += `<meta property="article:tag" content="${genre}" />`;
    });
    return articleTags;
  }
}

function formatDigits(digit) {
  return digit < 10 ? `0${digit}` : digit;
}

function getFormattedDate() {
  const now = new Date();
  const timezone = now.getTimezoneOffset() === 360 ? '-06:00' : '-07:00';

  return `${now.getUTCFullYear()}-${formatDigits(now.getUTCMonth() + 1)}-${formatDigits(
    now.getUTCDate()
  )}T${formatDigits(now.getUTCHours())}:${formatDigits(now.getUTCMinutes())}:${formatDigits(
    now.getUTCSeconds()
  )}${timezone}`;
  /*
        <meta property="og:updated_time" content="2017-09-29T22:02:52+02:00" />
  getFullYear()	Get the year as a four digit number (yyyy)
getMonth()	Get the month as a number (0-11)
getDate()	Get the day as a number (1-31)
getHours()	Get the hour (0-23)
getMinutes()	Get the minute (0-59)
getSeconds()	Get the second (0-59)
getMilliseconds()	Get the millisecond (0-999)
getTime()	Get the time (milliseconds since January 1, 1970)
getDay()	Get the weekday as a number (0-6)
*/
}

module.exports = {
  buildHead: function(song) {
    return `
      <head>
        <meta charset="utf-8" />
        <title>
          &quot;${song.title}&quot; by ${song.artist} on ${siteName}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="kanikapilas, ukulele, tabs, chords, songs, charts, music, free, images, best, favorite, artists" /> 
        <meta name="description" content="&quot;${song.title}&quot; by ${
      song.artist
    } ukulele tabs and chords. Free and guaranteed quality tablature with easy to read images." />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="&quot;${song.title}&quot; by ${song.artist} Ukulele Tabs on ${siteName}" />
        <meta property="og:description" content="&quot;${song.title}&quot; by ${
      song.artist
    } ukulele tabs and chords. Free and guaranteed quality tablature with easy to read images." />
        <meta property="article:section" content="${song.artist}" />

        <meta name="twitter:creator" content="@kanikapilas" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:description" content="&quot;${song.title}&quot; by ${
      song.artist
    } ukulele tabs and chords. Free and guaranteed quality tablature with easy to read images." />
        <meta property="twitter:title" content="&quot;${song.title}&quot; by ${
      song.artist
    } Ukulele Tabs on ${siteName}" />
        <meta name="twitter:site" content="@kanikapilas" />
        ${buildArticleTags(song.genre)}
        <meta property="article:modified_time" content="${nowDateTime}" />
        <meta property="og:updated_time" content="${nowDateTime}" />
      </head>
    `;
  }
};

/*
        <meta name="twitter:image" content="https://kanikapilas.com/uploads/2015/01/Twenty-One-Pilots.jpg" />
<meta property="og:url" content="https://kanikapilas.com/t/twenty-one-pilots/cant-help-falling-in-love/" />
<meta property="article:publisher" content="https://www.facebook.com/kanikapilas" />
<meta property="article:published_time" content="2015-01-24T16:30:11+02:00" />
<meta property="og:image" content="https://kanikapilas.com/uploads/2015/01/Twenty-One-Pilots.jpg" />
<meta property="og:image:secure_url" content="https://kanikapilas.com/uploads/2015/01/Twenty-One-Pilots.jpg" />
<meta property="og:image:width" content="300" />
<meta property="og:image:height" content="300" />
*/
