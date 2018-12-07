const linkReader = require('./link-reader');

const multiple = async ({urls, count, quantity, filepath}) => {
  const qnt = urls.length;

  const message = `DONE! ${count} sitemaps generated with ${qnt} links and an index sitemap file.`;

  const write = linkReader({filepath, count, urls, quantity, message});

  return write;
};

module.exports = multiple;
