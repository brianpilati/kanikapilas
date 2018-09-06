const sizes = require('./enums/font-sizes');

function convertPrimarySize(size) {
  if (size === sizes.large) {
    return 'font-large';
  } else if (size === sizes.medium) {
    return 'font-medium';
  } else if (size === sizes.small) {
    return 'font-small';
  } else {
    return 'font-tiny';
  }
}

function convertSecondarySize(size) {
  return convertPrimarySize(size + 1);
}

function isValidLetter(letter) {
  return letter.match(/'/) ? false : true;
}

function convertWord(word, size) {
  const preLetters = [];
  let firstLetter;
  let letterCount = 0;
  let findWord = true;
  while (findWord) {
    firstLetter = word.charAt(letterCount).toUpperCase();
    letterCount++;
    if (isValidLetter(firstLetter)) {
      findWord = false;
    } else {
      preLetters.push(firstLetter);
    }
  }

  const remainingLetters = word.substring(letterCount, word.length).toUpperCase();
  let preLetterString = '';
  if (preLetters.length) {
    preLetterString = `<span class="${convertSecondarySize(size)}">${preLetters.join('')}</span>`;
  }

  return `${preLetterString}<span class="${convertPrimarySize(
    size
  )}">${firstLetter}</span><span class="${convertSecondarySize(size)}">${remainingLetters}</span>`;
}

function convertSentence(sentence, size) {
  const words = sentence.split(/\s+/g);
  const convertedSentence = [];
  words.forEach(word => {
    convertedSentence.push(convertWord(word, size));
  });
  return convertedSentence.join('&nbsp;');
}

module.exports = {
  title(sentence, size) {
    return convertSentence(sentence, size);
  },

  getSiteTitle(size) {
    return this.title('kanikapilas.com', size);
  }
};
