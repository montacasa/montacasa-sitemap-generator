const generate = require('./generate');

// Create library module
const sitemapGenerator = ({
  domain,
  urls: rawUrls,
  filepath = './sitemap.xml',
}) => {
  if (!rawUrls) {
    throw new Error('Urls variable not provided.');
  }

  let pages = '';
  let counter = 0;

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

  const urls = unique(rawUrls);

  const generator = {
    queueURL: url => {
      pages += `<url><loc>${url}</loc></url> `;
      counter++;
    },
    start: () => {
      generate({domain, filepath, pages, urls});
      const message = `DONE! A file at ${filepath} was generated with ${counter} urls.`;
      console.info(message);
    },
  };

  const optionalUrls = urls || [];

  optionalUrls.forEach(url => {
    generator.queueURL(url);
  });

  generator.start();
};

module.exports = sitemapGenerator;
