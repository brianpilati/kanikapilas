const { Image } = require('image-js');
const fs = require('fs');
const filePath = require('../filePath');

function getNewSize(image, location) {
  if (location === 1) {
    return {
      x: 0,
      width: image.width,
      y: 0,
      height: image.height / 2
    };
  } else if (location === 2) {
    return {
      x: 0,
      width: image.width,
      y: image.height / 2,
      height: image.height / 2
    };
  }
}

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

        const newImage = croppedImage.crop(getNewSize(croppedImage, 1));
        return newImage.save(filePath.getDestinationImagePath(song, 1)).then(function() {
          const newImage = croppedImage.crop(getNewSize(croppedImage, 2));
          return newImage.save(filePath.getDestinationImagePath(song, 2)).then(function() {
            const newImage = croppedImage.crop(getNewSize(croppedImage, 3));
            return newImage.save(filePath.getDestinationImagePath(song, 3)).then(function() {
              const newImage = croppedImage.crop(getNewSize(croppedImage, 4));
              return newImage.save(filePath.getDestinationImagePath(song, 4));
            });
          });
        });
      });
    }
  }
}

module.exports = new FileResize();
