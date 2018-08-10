// https://www.npmjs.com/package/image-watermark
//'color' : 'rgb(154, 50, 46)'
var watermark = require('image-watermark');
var fs = require('fs');

class WaterMark {
  addWaterMark(fileName) {
    var options = Object({
      text: 'Kanikapilas.com',
      dstPath: '../../deployment/assets/' + fileName
    });

    var sourceFilePath = '../../src/assets/' + fileName;

    if (fs.existsSync(sourceFilePath) && fileName) {
      watermark.embedWatermark(sourceFilePath, options);
      return;
    }
  }
}

module.exports = new WaterMark();
