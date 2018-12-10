const counter = require('../counter');
const calculator = require('../calculator');
const single = require('../single');
const multiple = require('../multiple');
const uniq = require('../uniq');

/**
 * List sitemap generator
 *
 * @param {Object} params
 * @param {Array<String>} params.urls An array containing all urls.
 * @param {String} params.filepath    The final path to write sitemaps to
 * @param {Number} [params.max]        The maximum number of urls per sitemap (default is 50.000),
 *                            according to stackoverflow question:
 *                            https://stackoverflow.com/questions/2887358/limitation-for-google-sitemap-xml-file-size.
 * @returns {Promise<String>} The final single or multiple promises message.
 */
const list = async params => {
  const {urls: raw, filepath = './sitemap.xml', max = 50000} = params;
  const urls = uniq(raw);

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
};

module.exports = list;
