const parseString = text =>
  text.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');

module.exports = parseString;
