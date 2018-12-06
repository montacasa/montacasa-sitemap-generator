const fs = require('fs');
var readline = require('readline');
var stream = require('stream');

// TODO: option to not delete urlsFile after generation
const generate = ({domain, filepath, pages, urls: rawUrls, file: urlsFile}) => {
  const urls =
    rawUrls &&
    rawUrls.filter((item, index, self) => index === self.indexOf(item));

  function countFileLines(filePath) {
    return new Promise((resolve, reject) => {
      let lineCount = 0;
      if (!filePath) {
        resolve(0);
      }
      fs.createReadStream(filePath)
        .on('data', buffer => {
          let idx = -1;
          lineCount--; // Because the loop will run once for idx=-1
          do {
            idx = buffer.indexOf(10, idx + 1);
            lineCount++;
          } while (idx !== -1);
        })
        .on('end', () => {
          resolve(lineCount);
        })
        .on('error', reject);
    });
  }

  countFileLines(urlsFile)
    .then(result => {
      const length = rawUrls ? urls.length : result;
      console.log({length});

      const numberPerSitemap = 50000; // Limit the number of links per sitemap
      const sitemapsCount = Math.ceil(length / numberPerSitemap); // Count how many sitemap files should be generated

      // Generate one or more files depending on the amount of links
      if (sitemapsCount === 1) {
        const generateSingleFile = () => {
          // Generate one single file
          const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages}</urlset>`; // eslint-disable-line max-len
          // eslint-disable-next-line consistent-return
          fs.writeFile(filepath, sitemap, error => {
            if (error) {
              return console.error({error});
            }
          });
        };
        if (!pages) {
          let counter = 0;
          const instream = fs.createReadStream(urlsFile);
          const outstream = new stream();
          const rl = readline.createInterface(instream, outstream);

          rl.on('line', function(line) {
            pages += `<url><loc>${line}</loc></url> `;
            counter++;
          });

          rl.on('close', function() {
            generateSingleFile();
            console.info('closed');
            const message = `DONE! A file at ${filepath} was generated with ${counter} urls.`;
            console.info(message);
            fs.unlink(urlsFile, err => console.error(err));
          });
        }
      } else {
        // TODO: read file and generate pages
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
            list += `<sitemap><loc>${domain}/${file}</loc></sitemap>`; // Add it to the list

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
        `Generated ${sitemapsCount} sitemap file${
          sitemapsCount > 1 ? 's and an index' : ''
        }.`,
      );
    })
    // .then(fs.unlink(urlsFile, err => console.error(err))) // TODO: erase the file after generation
    .catch(err => {
      console.error(err);
    });

  return true;
};

module.exports = generate;
