const sitemapFormater = require('./sitemap-formater');
const writer = require('./writer');

/**
 * Generates a single sitemap file.
 *
 * @param {Object} params
 * @param {Array<String>} params.urls An array of urls.
 * @param {Promise<Number> | Number} params.count The number of urls.
 * @param {String} params.filepath The file path to write to.
 * @returns {Promise<any>} The promise's final message.
 */
const single = async params => {
  const {urls, count, filepath} = params;
  const sitemap = sitemapFormater(urls);
  const message = `DONE! One single sitemap generated with ${count} links.`;
  const write = await writer({filepath, file: sitemap, message});
  return write;
};

module.exports = single;
