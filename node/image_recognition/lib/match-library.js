const cv = require('opencv4nodejs');

class MatchLibrary {
  constructor(maxTolerance, debug, displayOutput) {
    this.maxTolerance = maxTolerance;
    this.debug = debug;
    this.displayOutput = displayOutput;
  }

  printOutput() {
    if (this.debug || this.displayOutput) {
      console.log.apply(null, arguments);
    }
  }

  findChord(originalMat, waldoMat, name) {
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
}

module.exports = MatchLibrary;
