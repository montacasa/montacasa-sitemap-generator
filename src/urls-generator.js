const urler = require('./urler');

// Multiple count generator TODO: make a module out of this function
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
