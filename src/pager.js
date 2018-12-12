/**
 * Wraps sitemap pages inside sitemap xml tags.
 *
 * @param {Array<String>} urls Array of urls.
 * @returns {String} The wrapped urls.
 */
const pager = urls => {
  const pages = urls.join('');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages}  </urlset>`; // eslint-disable-line max-len
  return sitemap;
};

module.exports = pager;
