const sitemapGenerator = require('sitemap-generator');

const montacasaSitemapGenerator = (domain, urls, filepath = './') => {
  // Create generator
  const generator = sitemapGenerator(domain, {
    filepath,
  });

  const optionalUrls = urls || [];

  optionalUrls.forEach(url => {
    generator.queueURL(url);
  });

  // register event listeners
  generator.on('add', url => {
    console.log('added', url);
  });

  generator.on('error', error => {
    console.log('Error: ', error);
  });

  generator.on('done', () => {
    console.log('DONE!');
  });

  // start the crawler
  generator.start();
};

module.exports = montacasaSitemapGenerator;
