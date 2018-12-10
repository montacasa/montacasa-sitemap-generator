/**
 * Set some configuration variables to be used later out of some other file infos.
 *
 * @param {Object} params
 * @param {String} params.domain The file domain.
 * @param {Number} params.number The file number.
 * @param {String} params.filepath The filepath to write to.
 * @returns {Object} The file configuration variables (fullPath, path and name).
 */
const fileConfigurator = params => {
  const {domain, number, filepath} = params;
  const name = `sitemap-${number}.xml`;
  const fullPath = `${domain}/${name}`;
  const path = filepath.substring(0, filepath.lastIndexOf('/'));
  return {fullPath, path, name};
};

module.exports = fileConfigurator;
