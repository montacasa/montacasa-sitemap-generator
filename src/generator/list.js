const counter = require('../counter');
const calculator = require('../calculator');
const single = require('../single');
const multiple = require('../multiple');

const list = async ({urls, filepath = './sitemap.xml', max = 50000}) => {
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
