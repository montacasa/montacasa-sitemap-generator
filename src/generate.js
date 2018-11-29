const fs = require('fs');

const generate = ({filepath, pages, urls}) => {
  const numberPerSitemap = 50000; // Limit the number of links per sitemap
  const sitemapsCount = Math.ceil(urls.length / numberPerSitemap); // Count how many sitemap files should be generated

  // Generate one or more files depending on the amount of links
  if (sitemapsCount === 1) {
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

      // Split sitemap.xml into multiple files
      for (let i = 0; i < sitemapsCount; i++) {
        const name = filepath.substring(
          filepath.lastIndexOf('/') + 1,
          filepath.lastIndexOf('.'),
        );
        const file = `${name}-${i}.xml`; // Define a single path
        list += `<sitemap><loc>${file}</loc></sitemap>`; // Add it to the list

        // Define new file path based on filepath variable. e.g.: src/sitemap-0.xml if filepath is src/sitemap.xml
        const dir = filepath.substring(0, filepath.lastIndexOf('/'));
        const path = `${dir}/${file}`;

        // Calculate next batch of url links
        const nextRange = lastLink + numberPerSitemap;
        const samplePages = urls.slice(lastLink, nextRange);

        // Generate sitemap
        const generateUrls = pageList => {
          let finalList = '';
          for (let p in pageList) {
            const page = pageList[p];
            finalList += `<url><loc>${page}</loc></url> `;
          }
          return finalList;
        };

        // Increment lastLink for the next batch
        lastLink += numberPerSitemap;

        // Prepare sitemap xml file
        const sitemapPre =
          '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        const urlsList = generateUrls(samplePages);
        const sitemapPost = '</urlset>';

        const sitemap = `${sitemapPre}${urlsList}${sitemapPost}`;

        // Write to disk
        // eslint-disable-next-line consistent-return
        fs.writeFile(path, sitemap, error => {
          if (error) {
            return console.error({error});
          }
        });
      }
      return list;
    };

    // Prepare the index file
    const sitemapPre =
      '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const sitemapPost = '</sitemapindex>';
    const sitemapindex = `${sitemapPre}${getSitemapsList()}${sitemapPost}`;

    // Write to disk
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

module.exports = generate;
