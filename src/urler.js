/**
 * Wraps a string in sitemap xml tags.
 *
 * @param {String} url A simple url.
 * @returns {String}
 */
const urler = url => {
  return `    <url><loc>${url}</loc></url>\n`;
};

module.exports = urler;
