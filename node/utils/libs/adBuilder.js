const ads = [
  {
    description: 'Ukulele Ace',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B079LSB2DR&asins=B079LSB2DR&linkId=e0c773ae35fba161b2a275c30e618296&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Uke Are My Sunshine',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DDYW6ZV&asins=B07DDYW6ZV&linkId=0198b685640b3389a04ac4e35e9a1a66&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Uke Can Do It',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DF3KGD5&asins=B07DF3KGD5&linkId=d6966f9c5cbe17c54d8619ee92cd40da&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'I Heart (Love) my Ukulele',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DF2GVC7&asins=B07DF2GVC7&linkId=b4db1bd9b318b2b9dd8abd9b329c5461&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Ukes Not Nukes',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DF1LD87&asins=B07DF1LD87&linkId=efab500468ddb6d9c88546af754435e9&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'I play a little guitar, but mostly I play the ukulele',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DDZ3XFC&asins=B07DDZ3XFC&linkId=479d537af91e3f135e689870961e379e&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Uke, I am your father',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DDYYBQ2&asins=B07DDYYBQ2&linkId=0b25ab6c8ec022d5a686d49b46f2280e&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Keep Calm Play Ukulele',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DDYYBP5&asins=B07DDYYBP5&linkId=0f6d92e19777b2164aca447747971636&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Ukulele With Orchids',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DDXHDJK&asins=B07DDXHDJK&linkId=40828e4ab9b17f52e72f79d5e79cad62&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Peace Love Ukulele',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DBPPS5S&asins=B07DBPPS5S&linkId=4100167bd6f2f508fdea3d1090f86837&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Ukulele is the bacon of music',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DBMCNCR&asins=B07DBMCNCR&linkId=76cec171d811ff4653f52967fc1e3b5d&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Eat, Sleep, Ukulele Repeat',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DBKX8GS&asins=B07DBKX8GS&linkId=9d0368c750ec7e1fa9547ee3f2f5f151&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Heres to my momma',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DDYW6Z7&asins=B07DDYW6Z7&linkId=2365bac79628cd0a47e48c0784abda41&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Austism is spelled Awesome',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DBRK5YJ&asins=B07DBRK5YJ&linkId=31773798d7d6023207dbb59aee1c6c58&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'LEGO Mom - dark',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DBNCW98&asins=B07DBNCW98&linkId=e67dd251c1b51d1d1e32f780e3df1b57&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'LEGO Mom - White',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DBN12C9&asins=B07DBN12C9&linkId=d224d84550c4a42cf6cd878c617819c8&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'I make it ... awkward. Do you?',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DBMLFJT&asins=B07DBMLFJT&linkId=8b99f8bf88ecc035ff8b33e8a3c31a69&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Get Some - dark',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DBMH9FQ&asins=B07DBMH9FQ&linkId=d0c1ba757b5d1aa5fb80be823ef91f91&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Get Some - White',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DBKX6GC&asins=B07DBKX6GC&linkId=36d3695f8fa9173b9c607df39e1b9fd9&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Youre So Georgeous',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DB6GRHJ&asins=B07DB6GRHJ&linkId=a600c5539732e9682e0da2df894274c6&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'I Dont run - white',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DL1G97L&asins=B07DL1G97L&linkId=63fd92cbb7ca1714034905e8f7a6dd59&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'I dont run - black',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07DKZL9BX&asins=B07DKZL9BX&linkId=b8e15c9b719aa7ee2294005571f2469a&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'Goat',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07FT4XT26&asins=B07FT4XT26&linkId=ad08ef0d39285a93c26c3faf8e405cee&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  },
  {
    description: 'GOAT - Large Image',
    code:
      '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=kanikapilas-20&marketplace=amazon&region=US&placement=B07FRM9N94&asins=B07FRM9N94&linkId=2b900f07f2648990b8b84db4a063bf12&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"></iframe>'
  }
];

let decisionAds = Array.from(ads);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function buildAd() {
  const adIndex = getRandomArbitrary(0, decisionAds.length);
  const ad = decisionAds.splice(adIndex, 1);

  if (decisionAds.length === 0) {
    decisionAds = Array.from(ads);
  }

  return ad.pop().code;
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
  },

  buildFooterAd: function() {
    return `
      <div class="bottom-banner-container">
        <iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=48&l=ur1&category=musicandentertainmentrot&f=ifr&linkID=bd67bf9862ab2fc67ab0f29d66a2d1cf&t=kanikapilas-20&tracking_id=kanikapilas-20" width="728" height="90" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>
      </div>
    `;
  }
};
