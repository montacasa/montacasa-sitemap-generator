const generate = require('./generate');

// Create library module
const sitemapGenerator = ({
  domain,
  urls: rawUrls,
  filepath = './sitemap.xml',
  file,
}) => {
  if (!rawUrls && !file) {
    throw new Error(
      'Urls not provided. You must provide either an array or a file.',
    );
  }

  let pages = '';
  // let counter = 0;

  const unique = xs => {
    const seen = {};
    return xs.filter(x => {
      if (seen[x]) {
        return;
      }
      seen[x] = true;
      return x; // eslint-disable-line consistent-return
    });
  };

  if (!rawUrls && !file) {
    throw new Error('You must pass an urls list either with `file` or `urls`.');
  }

  const urls = rawUrls && unique(rawUrls);

  const generator = {
    queueURL: url => {
      pages += `<url><loc>${url}</loc></url> `;
      // counter++;
    },
    start: () => {
      generate({domain, filepath, pages, urls, file});
      console.info('END');
    },
  };

  const optionalUrls = urls || [];

  optionalUrls.forEach(url => {
    generator.queueURL(url);
  });

  generator.start();
};

module.exports = sitemapGenerator;
