const writer = require('./writer');

/**
 * Writes a sitemap to a file.
 *
 * @param {Object} params
 * @param {String} params.list An array of urls.
 * @param {String} params.filepath The file path to write to .
 * @returns {Promise<any>} The promise's final message.
 */
const sitemapsWriter = async params => {
  const {list, filepath} = params;
  // Prepare sitemap xml file (with max number of files)
  const sitemapPre =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapPost = '</urlset>';

  const file = `${sitemapPre}${list}${sitemapPost}`;

  await writer({filepath, file});
};

module.exports = sitemapsWriter;
