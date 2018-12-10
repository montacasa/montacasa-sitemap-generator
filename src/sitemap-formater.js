const pager = require('./pager');
const urler = require('./urler');

/**
 * Formats a sitemap using external functions.
 *
 * @param {Array<String>} list An array of urls.
 * @returns {String} The formated sitemap.
 */
const sitemapFormater = list => {
  const urls = list.map(url => {
    return urler(url);
  });
  const sitemap = pager(urls);
  return sitemap;
};

module.exports = sitemapFormater;
