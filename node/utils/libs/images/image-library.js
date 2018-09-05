const cv = require('opencv4nodejs');
const { Image } = require('image-js');

let debug = false;

function fixOddPixel(pixel) {
  return pixel % 2 ? pixel - 1 : pixel;
}

function pixelMatch(pixel, isWhite) {
  const pixelMax = 65535;
  const result = pixel[0] < pixelMax || pixel[1] < pixelMax || pixel[2] < pixelMax;
  if (isWhite) {
    return !result;
  }
  return result;
}

function findAdditivePixel(image, xPoint, yPoint, isXPoint, isWhite) {
  let continueFinding = true;

  while (continueFinding) {
    if (pixelMatch(image.getPixelXY(xPoint, yPoint), isWhite)) {
      continueFinding = false;
    } else {
      isXPoint ? xPoint++ : yPoint++;
    }
  }

  return isXPoint ? xPoint : yPoint;
}

function findAdditiveNonWhiteXPixels(image, xPoint, yPoint) {
  const x = findAdditivePixel(image, xPoint, yPoint, true, false);
  return Object({
    x: x,
    y: yPoint
  });
}

function findAdditiveWhiteXPixels(image, xPoint, yPoint) {
  const x = findAdditivePixel(image, xPoint, yPoint, true, true);
  return Object({
    x: x,
    y: yPoint
  });
}

function findAdditiveNonWhiteYPixels(image, xPoint, yPoint) {
  const y = findAdditivePixel(image, xPoint, yPoint, false, false);
  return Object({
    x: xPoint,
    y: y
  });
}

function findSubtractivePixel(image, xPoint, yPoint, isXPoint, adjustedPoint, isWhite) {
  let continueFinding = true;
  let returnPoint = 0;

  while (continueFinding) {
    if (pixelMatch(image.getPixelXY(xPoint, yPoint), isWhite)) {
      continueFinding = false;
      returnPoint = isXPoint ? xPoint : yPoint;
      returnPoint -= adjustedPoint;
    } else {
      isXPoint ? xPoint-- : yPoint--;
    }
  }

  return returnPoint;
}

function findSubtractiveNonWhiteYPixels(image, xPoint, yPoint) {
  const y = findSubtractivePixel(image, xPoint, yPoint, false, 0, false);
  return Object({
    x: xPoint,
    y: y
  });
}

function findWidthCoordinates(image) {
  const x = findAdditivePixel(image, 0, fixOddPixel(image.height) / 2, true);
  return {
    x: x,
    width: findSubtractivePixel(image, image.width, fixOddPixel(image.height) / 2, true, x)
  };
}

function findHeightCoordinates(image) {
  const y = findAdditivePixel(image, fixOddPixel(image.width) / 2, 0, false);
  return {
    y: y,
    height: findSubtractivePixel(image, fixOddPixel(image.width) / 2, image.height, false, y)
  };
}

function getImageTopBottom(image) {
  let yStartPoint = fixOddPixel(image.height) / 2;
  let xPoint = findAdditivePixel(image, 0, yStartPoint, true) + 1;

  let continueFinding = true;
  let topYPoint = 0;
  let yPoint = yStartPoint;

  while (continueFinding) {
    if (!pixelMatch(image.getPixelXY(xPoint, yPoint))) {
      continueFinding = false;
      topYPoint = yPoint;
    } else {
      yPoint--;
    }
  }

  continueFinding = true;
  yPoint = yStartPoint;
  let bottomYPoint = 0;

  while (continueFinding) {
    if (!pixelMatch(image.getPixelXY(xPoint, yPoint))) {
      continueFinding = false;
      bottomYPoint = yPoint;
    } else {
      yPoint++;
    }
  }

  if (false) {
    const tmpPath = '/tmp/size_image.png';
    image.save(tmpPath).then(function() {
      const imageMat = cv.imread(tmpPath);
      imageMat.drawRectangle(new cv.Rect(0, topYPoint, image.width, height), new cv.Vec(0, 255, 0), 2, cv.LINE_8);
      cv.imshowWait('loaded', imageMat.resize(600, 800));
    });
  }

  return Object({
    imageTop: topYPoint,
    imageBottom: image.height - (bottomYPoint - topYPoint)
  });
}

function getArtistCoordinates(image, xyCoordinates) {
  let x = xyCoordinates.x;
  let y = xyCoordinates.y - 3;
  let boundary = Object({});

  let coordinates = findAdditiveNonWhiteXPixels(image, x, y);

  //Find LeftBoundary
  coordinates = findAdditiveWhiteXPixels(image, coordinates.x, coordinates.y);
  boundary.x = coordinates.x;

  //Find RightBoundary
  coordinates = findAdditiveNonWhiteXPixels(image, boundary.x, coordinates.y);
  boundary.width = coordinates.x - boundary.x;

  //Find TopBoundary
  coordinates = findSubtractiveNonWhiteYPixels(image, boundary.x + 1, y);
  boundary.y = coordinates.y + 1;

  //Find BottomBoundary
  const startX = boundary.width - 1;
  coordinates = findAdditiveNonWhiteYPixels(image, startX, y);
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

module.exports = {
  getCoordinates: function(image) {
    const widthCoordinates = findWidthCoordinates(image);

    const heightCoordinates = findHeightCoordinates(image);

    return {
      x: widthCoordinates.x,
      y: heightCoordinates.y,
      height: heightCoordinates.height,
      width: widthCoordinates.width
    };
  },

  getArtistCoordinates(artistImage, xyCoordinates) {
    return getArtistCoordinates(artistImage, xyCoordinates);
  },

  fixOddPixel: function(pixel) {
    return fixOddPixel(pixel);
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
