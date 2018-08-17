const { Image } = require('image-js');
const fs = require('fs');
const filePath = require('../filePath');

class FileResize {
  resizeImage(song) {
    const sourceFilePath = filePath.getSourceImagePath(song);

    if (fs.existsSync(sourceFilePath)) {
      return Image.load(sourceFilePath).then(function(image) {
        const height = image.height - (song.imageBottom + song.imageTop - 14);
        const croppedImage = image.crop({
          y: song.imageTop - 6,
          height: height
        });
        return croppedImage.save(filePath.getDestinationImagePath(song));
      });
    }
  }
}

module.exports = new FileResize();
