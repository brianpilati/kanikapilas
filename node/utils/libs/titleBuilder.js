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

module.exports = {
  title(title, size) {
    const firstLetter = title.charAt(0).toUpperCase();
    const remainingLetters = title.substring(1, title.length).toUpperCase();
    return `<span class="${convertPrimarySize(size)}">${firstLetter}</span><span class="${convertSecondarySize(
      size
    )}">${remainingLetters}</span>`;
  },

  getSiteTitle(size) {
    return this.title('kanikapilas.com', size);
  }
};
