const Tesseract = require('tesseract.js');
const cv = require('opencv4nodejs');
const filePath = require('../utils/libs/filePath');

function findTitle(imagePath) {
  let originalMat = cv.imread(imagePath).resizeToMax(1500);
  const tmpPath = `/tmp/title-${filePath.getFileGuid()}.png`;
  cv.imwrite(tmpPath, originalMat);

  return Tesseract.recognize(tmpPath, { lang: 'eng' }).finally(e => {
    console.log('ending the tesseract process');
    process.exit();
  });
}

module.exports = {
  findTitle(songImagePath) {
    return findTitle(songImagePath);
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
