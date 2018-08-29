const { Image } = require('image-js');
const fs = require('fs');
const filePath = require('../filePath');
const coordinates = require('./coordinates');

function getNewSize(image, location) {
  return {
    x: 0,
    width: image.width,
    y: location === 1 ? 0 : coordinates.fixOddPixel(image.height) / 2,
    height: coordinates.fixOddPixel(image.height) / 2
  };
}

class FileResize {
  resizeImage(song) {
    const sourceFilePath = filePath.getSourceImagePath(song);

    if (fs.existsSync(sourceFilePath)) {
      return Image.load(sourceFilePath).then(function(image) {
        let croppedImage = image.clone();

        const height = croppedImage.height - (song.imageBottom + song.imageTop - 4);

        croppedImage = croppedImage.crop({
          y: song.imageTop,
          height: height
        });

        const correctedImage = croppedImage.crop(coordinates.getCoordinates(croppedImage));

        correctedImage.flipX();
        correctedImage.flipY();

        const newImageOne = correctedImage.crop(getNewSize(correctedImage, 1));

        const destinationImagePath1 = filePath.getDestinationImagePath(song, 1);
        const destinationImagePath2 = filePath.getDestinationImagePath(song, 2);

        return newImageOne.save(destinationImagePath1).then(function() {
          const newImageTwo = correctedImage.crop(getNewSize(correctedImage, 2));
          return newImageTwo.save(destinationImagePath2).then(function() {
            return `${destinationImagePath1} and ${destinationImagePath2} were saved`;
          });
        });
      });
    }
  }
}

module.exports = new FileResize();
