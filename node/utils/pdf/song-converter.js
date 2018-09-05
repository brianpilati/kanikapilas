const PDFImage = require('pdf-image').PDFImage;
const fs = require('fs');
const path = require('path');
const timer = require('../lib/time');

const debug = true;
const testBook = 'Book_2_2.pdf';

function parseBook(book) {
  console.log(book);
  return debug ? book === testBook : true;
}

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
  const pdfFolder = './pdf-files/books';

  const mainStart = new Date();

  fs.readdirSync(pdfFolder).forEach(file => {
    if (file.match(/^Book_\d+_\d+\.pdf/)) {
      if (parseBook(file)) {
        const bookStart = new Date();
        console.log('Processing ', file);
        pngCreator(path.join(pdfFolder, file));
        console.log(`Parse ${file} Book Time: ${timer.timer(bookStart)}`);
      }
    }
  });

  console.log(`Parse All Book Time: ${timer.timer(mainStart)}`);
}

main();
