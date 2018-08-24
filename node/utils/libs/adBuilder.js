function buildAd() {
  return `
    <iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DDYW6ZV&asins=B07DDYW6ZV&linkId=0198b685640b3389a04ac4e35e9a1a66&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>
  `;
}

function adDivider() {
  return `
    <span><img src="/assets/icons/flower-icon.png" alt="flower"></span>
    <span><img src="/assets/icons/flower-icon.png" alt="flower"></span>
    <span><img src="/assets/icons/flower-icon.png" alt="flower"></span>
  `;
}

module.exports = {
  buildAsideAds: function() {
    return `
      <div class="tshirt-container">
        <div class="tshirt">
          ${buildAd()}
        </div>
        <div class="tshirt-divider">
          ${adDivider()}
        </div>
        <div class="tshirt">
          ${buildAd()}
        </div>
        <div class="tshirt-divider">
          ${adDivider()}
        </div>
        <div class="tshirt">
          ${buildAd()}
        </div>
      </div>
    `;
  }
};
