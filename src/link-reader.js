const domainExtractor = require('./domain-extractor');
const urler = require('./urler');
const writer = require('./writer');
const fileConfigurator = require('./file-configurator');

const linkReader = async ({filepath, sitemaps, urls, message}) => {
  // Loop throught sitemaps
  let lastLink = 0;
  let nextRange = sitemaps;
  const paths = [];
  for (let s = 0; s <= sitemaps; s++) {
    // urls = ['link1', 'link2', 'link3']
    const number = s;

    // Get domain and path using the first url
    const domain = domainExtractor(urls[0]);
    const {name, path, fullPath} = fileConfigurator({number, domain, filepath});

    paths.push(fullPath);

    const samplePages = urls.slice(lastLink, nextRange);

    // Multiple sitemaps generator
    const generateUrls = pageList => {
      let finalList = '';
      for (let p in pageList) {
        const page = pageList[p];
        const formated = urler(page);
        finalList += formated;
      }
      return finalList;
    };

    // Prepare sitemap xml file
    const sitemapPre =
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsList = generateUrls(samplePages);
    const sitemapPost = '</urlset>';

    // TODO: get path from filepath
    const fsPath = './test';

    const file = `${sitemapPre}${urlsList}${sitemapPost}`;
    const write = await writer({
      filepath: `${path}/${name}`,
      file,
      message: '...',
    });
    console.info(write);

    lastLink += sitemaps;
    nextRange += sitemaps;
  }

  console.log({paths}) // TODO: use this variable to generate sitemapindex

  return message;
};

module.exports = linkReader;
