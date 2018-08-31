const cv = require('opencv4nodejs');

class MatchLibrary {
  constructor(maxTolerance, debug, displayOutput) {
    this.maxTolerance = maxTolerance;
    this.debug = debug;
    this.displayOutput = displayOutput;
    this.foundWaldos = Object({});
  }

  printOutput() {
    if (this.debug || this.displayOutput) {
      console.log.apply(null, arguments);
    }
  }

  findWaldo(originalMat, waldoMat, name) {
    // Match template (the brightest locations indicate the highest match)
    const matched = originalMat.matchTemplate(waldoMat, 5);

    // Use minMaxLoc to locate the highest value (or lower, depending of the type of matching method)
    const minMax = matched.minMaxLoc();
    if (this.debug) {
      this.printOutput(minMax);

      const {
        maxLoc: { x, y }
      } = minMax;

      // Draw bounding rectangle
      originalMat.drawRectangle(new cv.Rect(x, y, waldoMat.cols, waldoMat.rows), new cv.Vec(0, 255, 0), 2, cv.LINE_8);

      this.printOutput(minMax.maxVal, this.maxTolerance, minMax.maxVal > this.maxTolerance);

      cv.imshow("We've found waldo!", originalMat);
      cv.waitKey();
    }

    return Object({
      x: minMax.maxLoc.x,
      distance: minMax.maxVal,
      match: minMax.maxVal > this.maxTolerance,
      name: name
    });
  }

  getFoundWaldos() {
    return this.foundWaldos;
  }

  calibrate(calibrationObject) {
    const minPosition = calibrationObject.x - 5;
    const maxPosition = calibrationObject.x + 5;
    let foundCount = 0;
    let foundPosition = calibrationObject.x;
    for (let index = minPosition; index < maxPosition; index++) {
      if (this.foundWaldos.hasOwnProperty(index)) {
        foundCount++;
        foundPosition = index;
      }
    }

    if (foundCount > 1) {
      throw `This is bad -- found count is: ${foundCount} for ${calibrationObject.name}`;
    }

    if (foundCount === 1) {
      const foundObject = this.foundWaldos[foundPosition];
      if (calibrationObject.distance > foundObject.distance) {
        this.foundWaldos[foundPosition] = calibrationObject;
      }
    } else {
      this.foundWaldos[calibrationObject.x] = calibrationObject;
    }
  }
}

module.exports = MatchLibrary;
