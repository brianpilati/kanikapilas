const filePath = require('./filePath');
const siteName = 'Kanikapilas.com';
const nowDateTime = getFormattedDate();

function buildArticleTags(genres) {
  let articleTags = '';
  if (genres) {
    genres.split(/,\s/g).forEach(function(genre) {
      articleTags += `<meta property="article:tag" content="${genre}" />`;
    });
  }
  return articleTags;
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
}

module.exports = {
  buildSongHead: function(song) {
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
        <meta property="article:publisher" content="https://www.facebook.com/kanikapilas" />
        <meta property="article:published_time" content="${song.createdDate}" />
        <meta property="og:url" content="${filePath.getUrlPath(song)}" />
        <meta name="twitter:image" content="${filePath.getImageUrlPath(song)}" />
        <meta name="og:image" content="${filePath.getImageUrlPath(song)}" />
        <meta name="og:image:secure_url" content="${filePath.getImageUrlPath(song)}" />
        <meta property="og:image:width" content="392" />
        <meta property="og:image:height" content="464" />
        <link rel="stylesheet" href="/css/song-styles.css">
      </head>
    `;
  },

  buildIndexHead: function() {
    return `
      <head>
        <meta charset="utf-8" />
        <title>${siteName} - Ukulele Tabs &amp; Tips </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="keywords" content="kanikapilas, ukulele, tabs, chords, songs, charts, music, free, images, best, favorite, artists" /> 

        <meta name="description" content="${siteName} is your source for finding chords and tabs to play your favorite songs on the ukulele. Ukulele players all over the world have direct and free access to guaranteed quality tablature with easy to read images." />

        <meta name="og:description" content="${siteName} is your source for finding chords and tabs to play your favorite songs on the ukulele. Ukulele players all over the world have direct and free access to guaranteed quality tablature with easy to read images." />

        <meta name="twitter:description" content="${siteName} is your source for finding chords and tabs to play your favorite songs on the ukulele. Ukulele players all over the world have direct and free access to guaranteed quality tablature with easy to read images." />

        <meta property="og:locale" content="en_US" />

        <link rel="canonical" href="https://${siteName}/" />
        <link rel="next" href="https://${siteName}/page/2/" />
        <link rel="prev" href="https://${siteName}" />

        <link rel="publisher" href="https://www.facebook.com/kanikapilas" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="${siteName}" />
        <meta property="og:url" content="https://${siteName}" />
        <meta property="og:site_name" content="${siteName}" />

        <meta name="twitter:creator" content="@kanikapilas" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta prooperty="twitter:title" content="${siteName} - Ukulele Tabs &amp; Tips" />
        <meta name="twitter:site" content="@kanikapilas" />
        <meta property="website:modified_time" content="${nowDateTime}" />
        <meta property="og:updated_time" content="${nowDateTime}" />
        <meta property="website:published_time" content="${nowDateTime}" />
        <link rel="stylesheet" href="/css/home-styles.css">
      </head>
    `;
  }
};
