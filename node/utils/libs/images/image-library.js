const cv = require('opencv4nodejs');
const { Image } = require('image-js');
const coordinatesLibrary = require('./coordinates-library');

let debug = false;

function getImageTopBottom(image) {
  let yStartPoint = coordinatesLibrary.fixOddPixel(image.height) / 2;
  let xPoint = coordinatesLibrary.findAdditiveNonWhiteXPixels(image, 0, yStartPoint).x;

  let topYPoint = coordinatesLibrary.findSubtractiveWhiteYPixels(image, xPoint, yStartPoint).y;

  let bottomYPoint = coordinatesLibrary.findAdditiveWhiteYPixels(image, xPoint, yStartPoint).y;

  if (debug) {
    const tmpPath = '/tmp/size_image.png';
    image.save(tmpPath).then(function() {
      const imageMat = cv.imread(tmpPath);
      imageMat.drawRectangle(
        new cv.Rect(xPoint, topYPoint, image.width - xPoint * 2, bottomYPoint - topYPoint),
        new cv.Vec(0, 255, 0),
        2,
        cv.LINE_8
      );
      cv.imshowWait('loaded', imageMat.resize(600, 800));
    });
  }

  return Object({
    imageTop: topYPoint,
    imageBottom: image.height - (bottomYPoint - topYPoint)
  });
}

function getRegionCoordinates(image, xyCoordinates) {
  let x = xyCoordinates.x;
  let y = xyCoordinates.y - 3;
  let boundary = Object({});

  let coordinates = coordinatesLibrary.findAdditiveNonWhiteXPixels(image, x, y);

  //Find LeftBoundary
  coordinates = coordinatesLibrary.findAdditiveWhiteXPixels(image, coordinates.x, coordinates.y);
  boundary.x = coordinates.x;

  //Find RightBoundary
  coordinates = coordinatesLibrary.findAdditiveNonWhiteXPixels(image, boundary.x, coordinates.y);
  boundary.width = coordinates.x - boundary.x;

  //Find TopBoundary
  coordinates = coordinatesLibrary.findSubtractiveNonWhiteYPixels(image, boundary.x + 1, y);
  boundary.y = coordinates.y + 1;

  //Find BottomBoundary
  const startX = boundary.width - 1;
  coordinates = coordinatesLibrary.findAdditiveNonWhiteYPixels(image, startX, y);
  boundary.height = coordinates.y - boundary.y;

  if (debug) {
    const imageMat = cv.imread(artistImagePath);
    imageMat.drawRectangle(
      new cv.Rect(boundary.x, boundary.y, boundary.width, boundary.height),
      new cv.Vec(0, 255, 0),
      2,
      cv.LINE_8
    );
    cv.imshowWait('loaded', imageMat);
  }

  return boundary;
}

function getCoordinates(image) {
  const widthCoordinates = coordinatesLibrary.findWidthCoordinates(image);
  const heightCoordinates = coordinatesLibrary.findHeightCoordinates(image);

  return {
    x: widthCoordinates.x,
    y: heightCoordinates.y,
    height: heightCoordinates.height,
    width: widthCoordinates.width
  };
}

module.exports = {
  getCoordinates: function(image) {
    return getCoordinates(image);
  },

  getArtistCoordinates(artistImage, xyCoordinates) {
    return getRegionCoordinates(artistImage, xyCoordinates);
  },

  getCapoCoordinates(capoImage, xyCoordinates) {
    return getRegionCoordinates(capoImage, xyCoordinates);
  },

  getImageTopBottom: function(image) {
    return getImageTopBottom(image);
  },

  textAdjustmentImage(imagePath) {
    return Image.load(imagePath).then(function(image) {
      image.data.forEach((pixel, $index) => {
        if (175 < pixel && pixel < 256) {
          image.data[$index] = 175;
        } else {
          image.data[$index] = 100;
        }
      });

      return image.save(imagePath).then(() => {
        if (debug) {
          originalMat = cv.imread(imagePath);
          cv.imshowWait('adjusted', originalMat);
        }
        return true;
      });
    });
  }
};

//getArtistCoordinates('/tmp/file-footer-e2484ad7-fb84-30f2-ebcc-c8df755d54a8.png', Object({x: 122, y: 79}));

/*
Image.load('/tmp/post_crop.png').then(image => {
  console.log(getCoordinates(image));
});
*/

/*
Image.load('/Users/brianpilati/code/github/kanikapilas/node/utils/pdf/pdf-files/books/Book_2_1-19.png').then(image => {
  console.log(getImageTopBottom(image));
});
*/
