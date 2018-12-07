const domainExtractor = require('./domain-extractor');
const urler = require('./urler');
const writer = require('./writer');
const fileConfigurator = require('./file-configurator');

const linkReader = async ({filepath, count, quantity, urls, message}) => {
  // Loop throught count
  let lastLink = 0;
  let nextRange = count;
  const paths = [];
  for (let number = 0; number < count; number++) {
    // Get domain and path using the first url
    const domain = domainExtractor(urls[0]);
    const {name, path, fullPath} = fileConfigurator({number, domain, filepath});

    paths.push(fullPath);

    const samplePages = urls.slice(lastLink, nextRange + 1);

    // Multiple count generator TODO: make a module out of this function
    const generateUrls = pageList => {
      let finalList = '';
      for (let p in pageList) {
        const page = pageList[p];
        const formated = urler(page);
        finalList += formated;
      }
      return finalList;
    };

    // Prepare sitemap xml file (with max number of files) TODO: make a module out of this functions
    const sitemapPre =
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsList = generateUrls(samplePages);
    const sitemapPost = '</urlset>';

    const file = `${sitemapPre}${urlsList}${sitemapPost}`;

    await writer({
      filepath: `${path}/${name}`,
      file,
      message: '...', // TODO!
    });

    lastLink += quantity;
    nextRange += quantity;
  }

  // TODO: use paths variable to generate sitemapindex
  const countList = () =>
    paths.map(path => `<sitemap><loc>${path}</loc></sitemap>`).join('');
  // Prepare the index file
  const sitemapPre =
    '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapPost = '</sitemapindex>';
  const sitemapindex = `${sitemapPre}${countList()}${sitemapPost}`;

  // Write to disk
  // eslint-disable-next-line consistent-return
  await writer({
    filepath, // TODO
    file: sitemapindex,
    message: '...',
  });

  return message;
};

module.exports = linkReader;
