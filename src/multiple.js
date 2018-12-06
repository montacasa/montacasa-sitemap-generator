const linkReader = require('./link-reader');

const multiple = async ({urls, count, filepath}) => {
  const qnt = urls.length;

  const message = `DONE! ${qnt /
    count} sitemaps generated with ${qnt} links and an index sitemap file.`;

  const write = linkReader({filepath, sitemaps: count, urls, message});

  return write;
};

module.exports = multiple;
