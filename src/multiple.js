const linkReader = require('./link-reader');

/**
 * Generate multiple sitemaps and an index.
 *
 * @param {Object} params
 * @param {Array<String>} params.urls An array containing all the urls.
 * @param {Promise<Number> | Number} params.count The amount of links.
 * @param {Number} params.quantity The quantity of sitemaps to generate.
 * @param {String} params.filepath The filepath.
 * @returns {Promise<any>} The promise's final message.
 */
const multiple = async params => {
  const {urls, count, quantity, filepath} = params;
  const qnt = urls.length;

  const message = `DONE! ${quantity} sitemaps generated with ${qnt} links and an index sitemap file.`;

  return linkReader({filepath, count, urls, quantity, message});
};

module.exports = multiple;
