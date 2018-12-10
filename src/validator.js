/**
 * Validates some fields.
 *
 * @param {Object} fields The fiels to validate.
 * @param {Array<String>} fields.urls An array of urls.
 * @param {file} fields.file An string representing a filepath.
 * @returns {Boolean} True if all is well.
 */
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
