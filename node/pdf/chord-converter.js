const PDFImage = require('pdf-image').PDFImage;
const fs = require('fs');
const path = require('path');

function pngCreator(pdfFile) {
  var pdfImage = new PDFImage(pdfFile, {
    convertOptions: {
      '-resize': '30x44',
      '-density': '72',
      '-quality': '75',
      '-units': 'PixelsPerInch',
      '-background': 'white',
      '-layers': 'flatten'
    }
  });

  return pdfImage.convertFile().then(
    function(imagePaths) {
      let imagePath = path.join(imagePaths.pop());
      console.log('File Converted ', imagePath);
      return imagePath;
    },
    function(error) {
      console.log(error);
    }
  );
}

function main() {
  const pdfFolder = './pdf-files/chords';

  fs.readdirSync(pdfFolder).forEach(file => {
    if (file.match(/^.*?\.pdf/)) {
      console.log('converting file ', file);
      pngCreator(path.join(pdfFolder, file)).then(function(sourceFilePath) {
        const destinationFile = file.replace('pdf', 'png').toLowerCase();
        console.log('moving - ', sourceFilePath);
        let dstFilePath = path.join('..', 'image_recognition', 'data', 'chords', destinationFile);

        fs.rename(sourceFilePath, dstFilePath, function() {
          console.log(destinationFile, ' moved');
        });
      });
    }
  });
}

main();
