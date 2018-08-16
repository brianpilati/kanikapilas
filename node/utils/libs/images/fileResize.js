const { Image } = require('image-js');
const fs = require('fs');
const filePath = require('../filePath');

class WaterMark {
  resizeImage(song) {
    const sourceFilePath = filePath.getSourceImagePath(song);

    if (fs.existsSync(sourceFilePath)) {
      return Image.load(sourceFilePath).then(function(image) {
        const croppedImage = image.crop({
          y: 49
        });
        return croppedImage.save(filePath.getDestinationImagePath(song));
      });
    }
  }
}

module.exports = new WaterMark();
