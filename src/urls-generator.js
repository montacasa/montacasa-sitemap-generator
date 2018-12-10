const urler = require('./urler');

/**
 * Generates formated urls from an array.
 *
 * @param {Array<String>} list An array of urls.
 * @returns {String} A formated list of urls.
 */
const urlsGenerator = list => {
  let finalList = '';
  for (let p in list) {
    const page = list[p];
    const formated = urler(page);
    finalList += formated;
  }
  return finalList;
};

module.exports = urlsGenerator;
