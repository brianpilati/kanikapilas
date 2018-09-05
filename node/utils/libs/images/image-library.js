const cv = require('opencv4nodejs');
const { Image } = require('image-js');

const debug = false;

module.exports = {
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
          originalMat = cv.imread(tmpPath);
          cv.imshowWait('adjusted', originalMat);
        }
        return true;
      });
    });
  }
};
