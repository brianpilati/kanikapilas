const Tesseract = require('tesseract.js');
const cv = require('opencv4nodejs');
const filePath = require('../utils/libs/filePath');

function findTitle(imagePath, resizeMax) {
  let originalMat = cv.imread(imagePath).resizeToMax(resizeMax);
  const tmpPath = `/tmp/title-${filePath.getFileGuid()}.png`;
  cv.imwrite(tmpPath, originalMat);

  return new Promise(resolve => {
    Tesseract.recognize(tmpPath, {
      lang: 'eng',
      classify_font_name: 'arial',
      crunch_leave_lc_strings: 6,
      crunch_leave_ok_strings: 3,
      crunch_leave_uc_strings: 6,
      crunch_long_repetitions: 5,
      language_model_ngram_space_delimited_language: 1,
      file_type: 'png',
      tessedit_fix_fuzzy_spaces: 1,
      outlines_2: 'lij!?%":;'
    })
      .then(results => {
        resolve(results.text);
      })
      .finally(() => {
        Tesseract.terminate();
      });
  });
}

module.exports = {
  findTitle(songImagePath, resizeMax) {
    resizeMax = resizeMax || 1500;
    return findTitle(songImagePath, resizeMax);
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
