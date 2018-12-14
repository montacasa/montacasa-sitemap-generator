const validator = require('./validator');
const generator = require('./generator');

/**
 * Wraps the sitemap-generator module.
 *
 * @param {Object} options
 * @param {String} [params.domain] An optional domain string.
 * @param {Array<String>} [options.urls] An array of urls.
 * @param {String} [options.file] A file (path) with a list of urls.
 * @param {String} [options.filepath] The file path to write the generated sitemap to.
 * @param {Number} [options.max] The maximum number of urls per sitemap (default is 50.000),
 *                            according to stackoverflow question:
 *                            https://stackoverflow.com/questions/2887358/limitation-for-google-sitemap-xml-file-size.
 * @returns {Promise<any>}
 */
const main = async options => {
  // Validate options before going forward
  const validate = validator(options);
  if (validate) {
    const {domain, urls, file, filepath, max} = options;

    // Remove duplicates
    if (file) {
      // Use the urls file list to generate by file system
      return await generator.file({domain, file, filepath});
    }
    // Use the urls list to generate by list
    return await generator.list({domain, urls, filepath, max});
  }
  return false;
};

module.exports = main;
