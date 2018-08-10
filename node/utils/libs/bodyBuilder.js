//https://css-tricks.com/snippets/css/a-guide-to-flexbox/
const filePath = require('./filePath');
const fairUsePolicy = require('./fairUsePolicy');

module.exports = {
  buildBody: function(song) {
    return `
      <body>
        <div class="song-page-container">
          <div class="song-page-header">
            <div class="song-page-title">
              ${song.title}
            </div>
            <div class="song-page-artist">
              ${song.artist}
            </div>
          </div>
          <div class="song-page-body">
            <aside class="tshirt-container">
              <div class="tshirt">
                <iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DDYW6ZV&asins=B07DDYW6ZV&linkId=0198b685640b3389a04ac4e35e9a1a66&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff">
      </iframe>
              </div>
              <div class="tshirt">
                Tshirt 2
              </div>
              <div class="tshirt">
                Tshirt 3
              </div>
            </aside>
            <article class="main">
              <div>
                <img class="song-image" src="${filePath.getRelativeImageUrlPath(song)}">
              </div>
              ${fairUsePolicy.getText()}
            </article>
          </div>
          <footer class="footer">Footer</footer>
        </div>
      </body>
    `;
  }
};
