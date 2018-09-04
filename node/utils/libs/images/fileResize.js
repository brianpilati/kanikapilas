const { Image } = require('image-js');
const fs = require('fs');
const filePath = require('../filePath');
const coordinates = require('./coordinates');
const artistMatch = require('../../../image_recognition/artist-match');
const titleMatch = require('../../../image_recognition/title-match');

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

function saveHeaderImage(song, songImage) {
  const headerImage = songImage.crop({
    y: 0,
    height: song.imageTop + 10
  });

  const headerImagePath = `/tmp/file-header-${filePath.getFileGuid()}.png`;

  return headerImage.save(headerImagePath).then(function() {
    return headerImagePath;
  });
}

function saveFooterImage(song, songImage) {
  const footerImage = songImage.crop({
    y: songImage.height - song.imageBottom - 25,
    height: song.imageBottom
  });

  const footerImagePath = `../../${filePath.getImageFooterPath(song)}`;
  return footerImage.save(footerImagePath).then(function() {
    return footerImagePath;
  });
}

function getCorrectedImage(song, songImage, isCommandline) {
  const height = songImage.height - (song.imageBottom + song.imageTop - getBottomAdjustment(isCommandline));

  const croppedImage = songImage.crop({
    y: song.imageTop,
    height: height
  });

  const correctedImage = croppedImage.crop(coordinates.getCoordinates(croppedImage));

  correctedImage.flipX();
  correctedImage.flipY();

  return correctedImage;
}

function saveNewImageOne(song, correctedImage) {
  const newImageOne = correctedImage.crop(getNewSize(correctedImage, 1));
  const destinationImagePath1 = filePath.getDestinationImagePath(song, 1);
  return newImageOne.save(destinationImagePath1).then(function() {
    return destinationImagePath1;
  });
}

function saveNewImageTwo(song, correctedImage) {
  const newImageTwo = correctedImage.crop(getNewSize(correctedImage, 2));
  const destinationImagePath2 = filePath.getDestinationImagePath(song, 2);
  return newImageTwo.save(destinationImagePath2).then(function() {
    return destinationImagePath2;
  });
}

function beautifyTitle(results) {
  title = results.text.split('-')[0];
  return title.replace(/\s+$/g, '');
}

class FileResize {
  resizeImage(song, isCommandline) {
    const sourceFilePath = `../../${filePath.getSourceImagePath(song)}`;

    if (fs.existsSync(sourceFilePath)) {
      return Image.load(sourceFilePath).then(function(image) {
        let songImage = image.clone();

        const correctedImage = getCorrectedImage(song, songImage, isCommandline);

        return saveNewImageOne(song, correctedImage).then(function(destinationImagePath1) {
          return saveNewImageTwo(song, correctedImage).then(function(destinationImagePath2) {
            return saveHeaderImage(song, songImage).then(function(headerImagePath) {
              return saveFooterImage(song, songImage).then(function(footerImagePath) {
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

  processImage(originalSongPath) {
    if (fs.existsSync(originalSongPath)) {
      return Image.load(originalSongPath).then(function(image) {
        let songImage = image.clone();
        let song = coordinates.getImageTopBottom(songImage);
        let title = '';

        saveHeaderImage(song, songImage).then(headerImagePath => {
          titleMatch.findTitle(headerImagePath).then(results => {
            title = beautifyTitle(results);
            console.log(`${title}::`);
          });
        });
        /*

        const correctedImage = getCorrectedImage(song, songImage, isCommandline);

        return saveNewImageOne(song, correctedImage).then(function(destinationImagePath1) {
          return saveNewImageTwo(song, correctedImage).then(function(destinationImagePath2) {
            return saveHeaderImage(song, songImage).then(function(headerImagePath) {
              return saveFooterImage(song, songImage).then(function(footerImagePath) {
                return Object({
                  images: [destinationImagePath1, destinationImagePath2, headerImagePath, footerImagePath]
                });
              });
            });
          });
        });
        */
      });
    }
  }
}

module.exports = new FileResize();

/*
fileResize = new FileResize();

fileResize
  .resizeImage(
    Object({
      id: 93,
      title: 'Lady in Red',
      artist: 'Chris Deburgh',
      imageTop: 100,
      imageBottom: 230
    }),
    false
  )
  .then(result => {
    console.log(result);
  });
  */
