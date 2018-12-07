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
};

module.exports = file;
