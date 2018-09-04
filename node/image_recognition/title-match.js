const Tesseract = require('tesseract.js');
const cv = require('opencv4nodejs');

//const imagePath = '../../deployment_local/assets/c/crowded-house/don-t-dream-it-s-over-header.png';
//const imagePath = '../../deployment_local/assets/c/chris-deburgh/lady-in-red-footer.png';
const imagePath = '../../deployment_local/assets/c/chris-deburgh/lady-in-red-header.png';
const tmpPath = '/tmp/title.png';

let originalMat = cv.imread(imagePath).resizeToMax(1500);
cv.imwrite('/tmp/title.png', originalMat);

console.log(tmpPath);
console.log(imagePath);

Tesseract.recognize(tmpPath, { lang: 'eng' })
  .then(function(result) {
    console.log(1, result.text);
  })
  .catch(error => {
    console.log(2, error);
  })
  .finally(e => {
    console.log('finally\n');
    process.exit();
  });

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
*/
