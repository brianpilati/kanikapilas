const { Image } = require('image-js');
const fs = require('fs');
const filePath = require('../filePath');

function fixOddPixel(pixel) {
  return pixel % 2 ? pixel + 1 : pixel;
}

function getNewSize(image, location) {
  if (location === 1) {
    return {
      x: 0,
      width: image.width,
      y: 0,
      height: fixOddPixel(image.height) / 2
    };
  } else if (location === 2) {
    return {
      x: 0,
      width: image.width,
      y: fixOddPixel(image.height) / 2,
      height: fixOddPixel(image.height) / 2
    };
  }
}

function findLeftLinePoint(image) {
  for (let xPixel = 0; xPixel < 200; xPixel++) {
    let yPixel = fixOddPixel(image.height) / 2;
    let pixel = image.getPixelXY(xPixel, yPixel);
    if (pixel[0] < 220 || pixel[1] < 220 || pixel[2] < 220) {
      return xPixel;
    }
  }
}

function findRightLinePoint(image, adjustedX) {
  for (let xPixel = image.width; xPixel > image.width - 200; xPixel--) {
    let yPixel = fixOddPixel(image.height) / 2;
    let pixel = image.getPixelXY(xPixel, yPixel);
    if (pixel[0] < 220 || pixel[1] < 220 || pixel[2] < 220) {
      return xPixel - adjustedX;
    }
  }
}

function findWidthCoordinates(image) {
  const x = findLeftLinePoint(image);
  return {
    x: x,
    width: findRightLinePoint(image, x)
  };
}

function findTopLinePoint(image) {
  for (let yPixel = 0; yPixel < 200; yPixel++) {
    let xPixel = fixOddPixel(image.width) / 2;
    let pixel = image.getPixelXY(xPixel, yPixel);
    if (pixel[0] < 220 || pixel[1] < 220 || pixel[2] < 220) {
      return yPixel;
    }
  }
}

function findBottomLinePoint(image, adjustedY) {
  for (let count = 1; count < 200; count++) {
    let xPixel = fixOddPixel(image.width) / 2;
    let yPixel = image.height - count;
    let pixel = image.getPixelXY(xPixel, yPixel);
    if (pixel[0] < 220 || pixel[1] < 220 || pixel[2] < 220) {
      return yPixel - adjustedY;
    }
  }
}

function findHeightCoordinates(image) {
  const y = findTopLinePoint(image);
  return {
    y: y,
    height: findBottomLinePoint(image, y)
  };
}

class FileResize {
  resizeImage(song) {
    const sourceFilePath = filePath.getSourceImagePath(song);

    if (fs.existsSync(sourceFilePath)) {
      return Image.load(sourceFilePath).then(function(image) {
        let croppedImage = image.clone();

        const height = croppedImage.height - (song.imageBottom + song.imageTop - 14);

        croppedImage = croppedImage.crop({
          y: song.imageTop - 6,
          height: height
        });

        const widthCoordinates = findWidthCoordinates(croppedImage);

        const heightCoordinates = findHeightCoordinates(croppedImage);

        const adjustedCrop = {
          x: widthCoordinates.x,
          y: heightCoordinates.y,
          height: heightCoordinates.height,
          width: widthCoordinates.width
        };

        const correctedImage = croppedImage.crop(adjustedCrop);

        correctedImage.flipX();
        correctedImage.flipY();

        const newImageOne = correctedImage.crop(getNewSize(correctedImage, 1));

        return newImageOne.save(filePath.getDestinationImagePath(song, 1)).then(function() {
          const newImageTwo = correctedImage.crop(getNewSize(correctedImage, 2));
          return newImageTwo.save(filePath.getDestinationImagePath(song, 2));
        });
      });
    }
  }
}

module.exports = new FileResize();
