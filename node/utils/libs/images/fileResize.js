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

function getBottomAdjustment(isCommandline) {
  return isCommandline ? 6 : -25;
}

class FileResize {
  resizeImage(song, isCommandline) {
    const sourceFilePath = `../../${filePath.getSourceImagePath(song)}`;

    if (fs.existsSync(sourceFilePath)) {
      return Image.load(sourceFilePath).then(function(image) {
        let songImage = image.clone();

        const height = songImage.height - (song.imageBottom + song.imageTop - getBottomAdjustment(isCommandline));

        const headerImage = songImage.crop({
          y: 0,
          height: song.imageTop + 10
        });

        const headerImagePath = `${filePath.getImageHeaderPath(song)}`;

        const footerImage = songImage.crop({
          y: songImage.height - song.imageBottom - 25,
          height: song.imageBottom
        });

        const footerImagePath = `${filePath.getImageFooterPath(song)}`;

        const croppedImage = songImage.crop({
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
            return headerImage.save(headerImagePath).then(function() {
              return footerImage.save(footerImagePath).then(function() {
                return Object({
                  images: [destinationImagePath1, destinationImagePath2, headerImagePath, footerImagePath]
                });
              });
            });
          });
        });
      });
    }
  }
}

module.exports = new FileResize();

/*
fileResize = new FileResize();

fileResize.resizeImage (
  Object({
    id: 93,
    title: 'Lady in Red',
    artist: 'Chris Deburgh',
    imageTop: 100,
    imageBottom: 230 
  }), false).then(result => {
    console.log(result);
  });
  */
