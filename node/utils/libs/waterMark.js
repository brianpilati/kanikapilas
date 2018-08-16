// https://www.npmjs.com/package/image-watermark
//'color' : 'rgb(154, 50, 46)'
var watermark = require('image-watermark');
var fs = require('fs');
const filePath = require('./filePath');

class WaterMark {
  addWaterMark(song) {
    var destinationFilePath = filePath.getDestinationImagePath(song);

    var options = Object({
      text: 'Do Not Print',
      dstPath: destinationFilePath
    });

    if (fs.existsSync(destinationFilePath)) {
      watermark.embedWatermark(destinationFilePath, options);
      return;
    }
  }
}

module.exports = new WaterMark();
