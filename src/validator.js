const validator = fields => {
  const {urls, file} = fields;
  if (!urls && !file) {
    throw new Error('You must provide a list of urls!');
  }
  if (urls && !Array.isArray(urls)) {
    throw new Error('Urls list variable should be an array!');
  }
  if (file && !typeof file !== 'string') {
    throw new Error('File variable should be a string!');
  }
  return true;
};

module.exports = validator;
