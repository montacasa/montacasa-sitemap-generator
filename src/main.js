const validator = require('./validator');
const uniq = require('./uniq');

const aFunction = options => {
  const validate = validator(options);
  if (validate) {
    const {urls, file} = options;
    if (file) {
      // TODO: create a file generator
    } else {
      // TODO: create a list generator
    }
    // TODO: create a uniq function

    return true;
  }
  return false;
};

module.exports = aFunction;
