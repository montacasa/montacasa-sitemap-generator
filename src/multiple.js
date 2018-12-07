const linkReader = require('./link-reader');

const multiple = async ({urls, count, quantity, filepath}) => {
  const qnt = urls.length;

  const message = `DONE! ${quantity} sitemaps generated with ${qnt} links and an index sitemap file.`;

  return linkReader({filepath, count, urls, quantity, message});
};

module.exports = multiple;
