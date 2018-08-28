const PDFImage = require('pdf-image').PDFImage;
const fs = require('fs');
const path = require('path');

function pngCreator(pdfFile) {
  var pdfImage = new PDFImage(pdfFile, {
    convertOptions: {
      '-resize': '800x1035',
      '-density': '300',
      '-quality': '75',
      '-units': 'PixelsPerInch',
      '-background': 'white',
      '-layers': 'flatten'
    }
  });

  pdfImage.convertFile().then(
    function(imagePaths) {
      console.log('File Converted ', imagePaths);
    },
    function(error) {
      console.log(error);
    }
  );
}

function main() {
  const imageFolder = './pdf-files/';

  fs.readdirSync(imageFolder).forEach((file, $index) => {
    if (file.match(/^Book_\d+_\d+\.pdf/)) {
      console.log('Processing ', file);
      pngCreator(path.join('./pdf-files', file));
    }
  });
}

main();
