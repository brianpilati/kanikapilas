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

function findSubtractivePixel(image, xPoint, yPoint, isXPoint, isWhite) {
  let continueFinding = true;
  let returnPoint = 0;

  while (continueFinding) {
    if (pixelMatch(image.getPixelXY(xPoint, yPoint), isWhite)) {
      continueFinding = false;
      returnPoint = isXPoint ? xPoint : yPoint;
    } else {
      isXPoint ? xPoint-- : yPoint--;
    }
  }

  return returnPoint;
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

function findAdditiveWhiteYPixels(image, xPoint, yPoint) {
  const y = findAdditivePixel(image, xPoint, yPoint, false, true);
  return Object({
    x: xPoint,
    y: y
  });
}

function findSubtractiveNonWhiteYPixels(image, xPoint, yPoint) {
  const y = findSubtractivePixel(image, xPoint, yPoint, false, false);
  return Object({
    x: xPoint,
    y: y
  });
}

function findSubtractiveWhiteYPixels(image, xPoint, yPoint) {
  const y = findSubtractivePixel(image, xPoint, yPoint, false, true);
  return Object({
    x: xPoint,
    y: y
  });
}

function findSubtractiveNonWhiteXPixels(image, xPoint, yPoint) {
  const x = findSubtractivePixel(image, xPoint, yPoint, true, false);
  return Object({
    x: x,
    y: yPoint
  });
}

module.exports = {
  findWidthCoordinates(image) {
    const yPoint = fixOddPixel(image.height) / 2;
    const x = findAdditiveNonWhiteXPixels(image, 0, yPoint).x;

    return {
      x: x,
      width: findSubtractiveNonWhiteXPixels(image, image.width, yPoint).x - x
    };
  },

  findHeightCoordinates(image) {
    const x = fixOddPixel(image.width) / 2;
    const y = findAdditiveNonWhiteYPixels(image, x, 0).y;

    return {
      y: y,
      height: findSubtractiveNonWhiteYPixels(image, x, image.height).y - y
    };
  },

  fixOddPixel: function(pixel) {
    return fixOddPixel(pixel);
  },

  findAdditiveNonWhiteXPixels(image, xPoint, yPoint) {
    return findAdditiveNonWhiteXPixels(image, xPoint, yPoint);
  },

  findAdditiveWhiteXPixels(image, xPoint, yPoint) {
    return findAdditiveWhiteXPixels(image, xPoint, yPoint);
  },

  findAdditiveNonWhiteYPixels(image, xPoint, yPoint) {
    return findAdditiveNonWhiteYPixels(image, xPoint, yPoint);
  },

  findAdditiveWhiteYPixels(image, xPoint, yPoint) {
    return findAdditiveWhiteYPixels(image, xPoint, yPoint);
  },

  findSubtractiveNonWhiteYPixels(image, xPoint, yPoint) {
    return findSubtractiveNonWhiteYPixels(image, xPoint, yPoint);
  },

  findSubtractiveWhiteYPixels(image, xPoint, yPoint) {
    return findSubtractiveWhiteYPixels(image, xPoint, yPoint);
  },

  findSubtractiveNonWhiteXPixels(image, xPoint, yPoint) {
    return findSubtractiveNonWhiteXPixels(image, xPoint, yPoint);
  }
};
