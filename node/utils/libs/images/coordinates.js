function fixOddPixel(pixel) {
  return pixel % 2 ? pixel - 1 : pixel;
}

function pixelMatch(pixel) {
  const pixelMax = 65535;
  return pixel[0] < pixelMax || pixel[1] < pixelMax || pixel[2] < pixelMax;
}

function findAdditivePixel(image, xPoint, yPoint, isXPoint) {
  let continueFinding = true;

  while (continueFinding) {
    if (pixelMatch(image.getPixelXY(xPoint, yPoint))) {
      continueFinding = false;
    } else {
      isXPoint ? xPoint++ : yPoint++;
    }
  }

  return isXPoint ? xPoint : yPoint;
}

function findSubtractivePixel(image, xPoint, yPoint, isXPoint, adjustedPoint) {
  let continueFinding = true;
  let returnPoint = 0;

  while (continueFinding) {
    if (pixelMatch(image.getPixelXY(xPoint, yPoint))) {
      continueFinding = false;
      returnPoint = isXPoint ? xPoint : yPoint;
      returnPoint -= adjustedPoint;
    } else {
      isXPoint ? xPoint-- : yPoint--;
    }
  }

  return returnPoint;
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

  return Object({
    imageTop: topYPoint,
    imageBottom: image.height - bottomYPoint
  });
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

  fixOddPixel: function(pixel) {
    return fixOddPixel(pixel);
  },

  getImageTopBottom: function(image) {
    return getImageTopBottom(image);
  }
};
