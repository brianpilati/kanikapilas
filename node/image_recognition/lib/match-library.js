const cv = require('opencv4nodejs');
const timer = require('../../lib/time');
const { Image } = require('image-js');

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

  findWaldos(originalMat, waldoMat) {
    // Match template (the brightest locations indicate the highest match)
    let matched = originalMat.matchTemplate(waldoMat, 5);

    let foundWaldos = 0;

    while (true) {
      // Use minMaxLoc to locate the highest value (or lower, depending of the type of matching method)
      const minMax = matched.minMaxLoc();

      let {
        maxLoc: { x, y }
      } = minMax;

      this.printOutput(minMax.maxVal, this.maxTolerance, minMax.maxVal > this.maxTolerance);

      if (minMax.maxVal < this.maxTolerance) {
        this.printOutput('Not Found', minMax);

        if (this.debug) {
          originalMat.drawRectangle(
            new cv.Rect(x, y, waldoMat.cols, waldoMat.rows),
            new cv.Vec(255, 0, 0),
            2,
            cv.LINE_8
          );
          cv.imshowWait("We didn't find waldo!", originalMat);
        }
        break;
      }

      this.printOutput('Found', minMax);

      if (this.debug) {
        // Draw bounding rectangle
        originalMat.drawRectangle(new cv.Rect(x, y, waldoMat.cols, waldoMat.rows), new cv.Vec(0, 255, 0), 2, cv.LINE_8);

        cv.imshowWait("We've found waldo!", originalMat);
      }

      //Fill in the current found waldo
      matched.floodFill(minMax.maxLoc, 0);

      foundWaldos++;
    }

    this.printOutput(`Total Waldos Found: ${foundWaldos}`);

    return foundWaldos;
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

  processImage(imagePath, options) {
    const _this = this;
    options = options || Object({});
    try {
      const start = new Date();

      return Image.load(imagePath).then(function(image) {
        if (options.crop) {
          image = image.crop({
            height: options.cropHeight
          });
        }

        if (options.cropBottom) {
          image = image.crop({
            y: image.height - options.cropHeight,
            height: options.cropHeight
          });
        }

        const savedImagePath = `/tmp/song_cropped.png`;
        return image.save(savedImagePath).then(function() {
          let originalMat = cv.imread(savedImagePath);
          if (options.rotate) {
            originalMat = originalMat.rotate(cv.ROTATE_180);
          }
          if (options.resizeToMax) {
            originalMat = originalMat.resizeToMax(options.resizeToMaxValue);
          }

          _this.printOutput(`Parse Song Time: ${timer.timer(start)}`);

          return originalMat;
        });
      });
    } catch (error) {
      _this.printOutput('Error: ', error);
    }
  }
}

module.exports = MatchLibrary;
