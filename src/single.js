const sitemapFormater = require('./sitemap-formater');
const writer = require('./writer');

const single = async ({urls, count, filepath}) => {
  const sitemap = sitemapFormater(urls);
  const message = `DONE! One single sitemap generated with ${count} links.`;
  const write = await writer({filepath, file: sitemap, message});
  return write;
};

module.exports = single;
