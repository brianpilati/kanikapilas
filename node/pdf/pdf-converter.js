var PDFImage = require('pdf-image').PDFImage;

var pdfImage = new PDFImage('./pdf-files/Book_2_1.pdf', {
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
    console.log(imagePaths);
  },
  function(error) {
    console.log(error);
  }
);
