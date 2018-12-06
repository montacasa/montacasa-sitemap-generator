const counter = require('../counter');
const calculator = require('../calculator');
const single = require('../single');

const list = async ({urls: raw, file = null, filepath = './sitemap.xml'}) => {
  // Count quantity of links and sitemaps
  const count = counter(raw);

  const calculate = calculator({quantity: count});

  // Generate a single or multiple files
  switch (calculate) {
    case 1:
      return single({urls: raw, count, filepath});
    default:
      // TODO: generate a multiple files
      return false;
  }

  // Generate multiple files

  /* eslint-disable max-len */
  /* TODO:
   *  - a "calculate" loop with:
   *      - a domain name catcher to extract https://www.montacasa.com.br from an url
   *      - a file name generator, as in sitemap-1.xml
   *      - a file path generator, as in https://www.montacasa.com.br/sitemap-1.xml
   *      - a next batch calculator, for defining range of links it should ask for
   *      - a file reader to get the number of lines defined by the previous range -> https://stackoverflow.com/questions/7379310/node-js-how-to-read-one-line-of-numbers-from-a-file-into-an-array
   *      - a file writer to save sitemap-1.xml
   *  - an indexsitemap generator with
   *  - the final message
   */
};

module.exports = list;
