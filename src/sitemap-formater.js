const pager = require('./pager');
const urler = require('./urler');

const sitemapFormater = list => {
  const urls = list.map(url => {
    return urler(url);
  });
  const sitemap = pager(urls);
  return sitemap;
};

module.exports = sitemapFormater;
