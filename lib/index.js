const fs = require('fs');

const generate = (filepath, pages, urls, domain, split) => {
  const numberPerSitemap = 10000;
  const sitemapsCount = Math.ceil(urls.length / numberPerSitemap);
  if (!split || sitemapsCount === 1) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages}</urlset>`; // eslint-disable-line max-len
    // eslint-disable-next-line consistent-return
    fs.writeFile(filepath, sitemap, error => {
      if (error) {
        return console.error({error});
      }
    });
  } else {
    const getSitemapsList = () => {
      let list = '';
      for (let i = 0; i < sitemapsCount; i++) {
        list += `<sitemap>${domain}/sitemap-${i}</sitemap>`;
      }
      return list;
    };

    // TODO: Generate sitemaps!

    const sitemapindex = `<?xml version="1.0" encoding="UTF-8"?>${getSitemapsList()}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></sitemapindex>`; // eslint-disable-line max-len
    return console.log({sitemapindex});
  }
  return true;
};

const montacasaSitemapGenerator = (
  domain,
  rawUrls,
  filepath = './',
  split = false,
) => {
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
      generate(filepath, pages, urls, domain, split);
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
