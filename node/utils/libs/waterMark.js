// https://www.npmjs.com/package/image-watermark
//'color' : 'rgb(154, 50, 46)'
var watermark = require('image-watermark');
var fs = require('fs');
const filePath = require('./filePath');

class WaterMark {
  addWaterMark(song) {
    var options = Object({
      text: 'Do Not Print',
      dstPath: filePath.getDestinationImagePath(song)
    });

    var sourceFilePath = filePath.getSourceImagePath(song);

    if (fs.existsSync(sourceFilePath)) {
      watermark.embedWatermark(sourceFilePath, options);
      return;
    }
  }
}

module.exports = new WaterMark();
