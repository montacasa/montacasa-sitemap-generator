const counter = require('../counter');
const calculator = require('../calculator');
const single = require('../single');
const multiple = require('../multiple');
const fileLineReader = require('../file-line-reader');

const file = async ({file, filepath = './sitemap.xml', max = 50000}) => {
  let urls = [];
  const func = data => {
    urls.push(data);
  };
  await fileLineReader(file, func);

  // Count quantity of links and sitemaps
  const links = counter(urls);
  const sitemaps = calculator({max, quantity: links});

  // Generate a single or multiple files
  switch (sitemaps) {
    case 1:
      return single({urls: urls, count: links, filepath});
    default:
      return multiple({urls, count: links, quantity: sitemaps, filepath});
  }
  // single -> fileLineLooper -> fileWriter

  // multiple -> fileLineLooper -> generate domain, sitemapName, sitemapPath, updateBatch -> fileWriter

  // Generate multiple files

  /* eslint-disable max-len */
  /* TODO:
   *  - a "calculate" loop with:
   *      - a domain name catcher to extract https://www.montacasa.com.br from an url
   *      - a file generator with:
   *        - a file name generator, as in sitemap-1.xml
   *        - a file path generator, as in https://www.montacasa.com.br/sitemap-1.xml
   *      - a next batch calculator, for defining range of links it should ask for
   *      - a file reader to get the number of lines defined by the previous range -> https://stackoverflow.com/questions/7379310/node-js-how-to-read-one-line-of-numbers-from-a-file-into-an-array
   *      - a file writer to save sitemap-1.xml
   *  - an indexsitemap generator
   *  - the final message
   */
  return true;
};

module.exports = file;
