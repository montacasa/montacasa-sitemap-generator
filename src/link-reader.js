const domainExtractor = require('./domain-extractor');
const fileConfigurator = require('./file-configurator');
const generateUrls = require('./urls-generator');
const sitemapsWriter = require('./sitemaps-writer');
const indexGenerator = require('./index-generator');

/**
 * Loop thought array of urls to read and create multiple sitemaps
 *
 * @param {Object} params
 * @param {String} params.filepath The filepath to generate the sitemap index (it is used to determinate the directory
 *                                 to generate the multiple sitemaps too)
 * @param {Number} params.count The number of links per sitemap
 * @param {Number} params.quantity The quantity of sitemaps to generate
 * @param {Array<String>} params.urls The list of urls to loop thought
 * @param {String} params.message The final message to return
 * @returns {Promise<String>} The final message
 */
const linkReader = async params => {
  const {filepath, count, quantity, urls, message} = params; // TODO: remove count?
  const perSitemap = Math.round(count / quantity);
  // Loop throught count
  let lastLink = 0;
  let nextRange = perSitemap;
  const paths = [];

  for (let number = 0; number < quantity; number++) {
    // Get domain and path using the first url
    const domain = domainExtractor(urls[0]);
    const {name, path, fullPath} = fileConfigurator({number, domain, filepath});

    paths.push(fullPath);

    // Get the current pages sample
    const samplePages = urls.slice(lastLink, nextRange);

    // Write a parcial sitemap
    await sitemapsWriter({
      list: generateUrls(samplePages),
      filepath: `${path}/${name}`,
    });

    lastLink += perSitemap;
    nextRange += perSitemap;
  }

  // Write the index sitemap
  await indexGenerator({paths, filepath});

  return message;
};

module.exports = linkReader;
