const fs = require('fs');

const montacasaSitemapGenerator = (domain, urls, filepath = './') => {
  let pages = '';
  let counter = 0;

  const generator = {
    queueURL: url => {
      pages += `<url><loc>${url}</loc></url> `;
      counter++;
    },
    start: () => {
      const sitemap = `<urlset>${pages}</urlset>`;
      // eslint-disable-next-line consistent-return
      fs.writeFile(filepath, sitemap, error => {
        if (error) {
          return console.error({error});
        }
      });
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

module.exports = montacasaSitemapGenerator;
