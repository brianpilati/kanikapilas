const Tesseract = require('tesseract.js');
const cv = require('opencv4nodejs');
const filePath = require('../libs/filePath');
const imageLibrary = require('../libs/images/image-library');

function findWords(imagePath, resizeMax) {
  let originalMat = cv.imread(imagePath).resizeToMax(resizeMax);
  const tmpPath = `/tmp/title-${filePath.getFileGuid()}.png`;
  cv.imwrite(tmpPath, originalMat);

  return imageLibrary.textAdjustmentImage(tmpPath).then(() => {
    return new Promise(resolve => {
      Tesseract.recognize(tmpPath, {
        lang: 'eng'
      })
        .then(results => {
          resolve(results.text);
        })
        .finally(() => {
          Tesseract.terminate();
        });
    });
  });
}

module.exports = {
  findWords(songImagePath, resizeMax) {
    resizeMax = resizeMax || 1500;
    return findWords(songImagePath, resizeMax);
  }
};

/*
Tesseract.recognize(dataPath, {
  lang: path.resolve(__dirname, langPath)
}).then(function(result){
  console.log(result)
}).catch((error) => {
  console.log(error)
}).finally(e => {
  console.log('finally\n')
  process.exit()
})

//const imagePath = '../../deployment_local/assets/c/crowded-house/don-t-dream-it-s-over-header.png';
//const imagePath = '../../deployment_local/assets/c/chris-deburgh/lady-in-red-footer.png';
//const imagePath = '../../deployment_local/assets/c/chris-deburgh/lady-in-red-header.png';
//const tmpPath = '/tmp/title.png';
*/
