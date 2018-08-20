function fixOddPixel(pixel) {
  return pixel % 2 ? pixel + 1 : pixel;
}

function pixelMatch(pixel) {
  return pixel[0] < 220 || pixel[1] < 220 || pixel[2] < 220;
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
  }
};
