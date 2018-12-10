const writer = require('./writer');

/**
 * Generates a sitemap index file.
 *
 * @param {Object} params
 * @param {Object} params.paths The multiple sitemap files urls to include in the generated index.
 * @param {Object} params.filepath The sitemap index filepath to write to.
 * @returns {Promise<any>} The promise's resulting message.
 */
const indexGenerator = async params => {
  const {paths, filepath} = params;
  const countList = () =>
    paths.map(path => `<sitemap><loc>${path}</loc></sitemap>`).join('');
  // Prepare the index file
  const sitemapPre =
    '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapPost = '</sitemapindex>';
  const sitemapindex = `${sitemapPre}${countList()}${sitemapPost}`;

  // Write to disk
  // eslint-disable-next-line consistent-return
  await writer({
    filepath,
    file: sitemapindex,
  });
};

module.exports = indexGenerator;
