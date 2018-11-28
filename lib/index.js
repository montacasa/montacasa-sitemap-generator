const fs = require('fs');

const generate = (filepath, pages, urls, domain, split) => {
  const numberPerSitemap = 50000; // limit the number of links per sitemap
  const sitemapsCount = Math.ceil(urls.length / numberPerSitemap); // count how many sitemap files should be generated

  // Generate one or more files depending on the amount of links
  if (!split || sitemapsCount === 1) {
    // Generate one single file
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages}</urlset>`; // eslint-disable-line max-len
    // eslint-disable-next-line consistent-return
    fs.writeFile(filepath, sitemap, error => {
      if (error) {
        return console.error({error});
      }
    });
  } else {
    // Generate sitemap files
    const getSitemapsList = () => {
      let list = '';
      let lastLink = 0;

      // split sitemap.xml into multiple files
      for (let i = 0; i < sitemapsCount; i++) {
        // define a single path
        const file = `sitemap-${i}.xml`;

        // add it to the list
        list += `<sitemap><loc>${domain}/${file}</loc></sitemap>`;

        // write file into disk
        const dir = filepath.substring(0, filepath.lastIndexOf('/'));
        const path = `${dir}/${file}`;

        const nextRange = lastLink + numberPerSitemap;
        const samplePages = urls.slice(lastLink, nextRange);
        const sampleUrls = ps => {
          let l = '';
          for (let p in ps) {
            const url = ps[p];
            l += `<url><loc>${url}</loc></url> `;
          }
          return l;
        };
        sampleUrls(samplePages);
        lastLink += numberPerSitemap;

        /* eslint-disable-next-line max-len*/
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sampleUrls(
          samplePages,
        )}</urlset>`;

        // eslint-disable-next-line consistent-return
        fs.writeFile(path, sitemap, error => {
          if (error) {
            return console.error({error});
          }
        });
      }
      return list;
    };

    // Generate the index file
    const sitemapindex = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${getSitemapsList()}</sitemapindex>`; // eslint-disable-line max-len
    // eslint-disable-next-line consistent-return
    fs.writeFile(filepath, sitemapindex, error => {
      if (error) {
        return console.error({error});
      }
    });
  }
  console.info(
    `Generated ${sitemapsCount} sitemap file${sitemapsCount > 1 ? 's' : ''}.`,
  );
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
