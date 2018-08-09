var watermark = require('image-watermark');

class WaterMark {
  addWaterMark(fileName) {
    var options = Object({
      test: 'Kanikapilas.com',
      dstPath: '../../deployment/' + $filename
    });

    watermark.embedWatermarkWithCb('../../src/assets/' + fileName, function(err) {
      if (!err) console.log('Succefully embeded watermark for ' + fileName);
    });
  }
}

module.exports = new WaterMark();
