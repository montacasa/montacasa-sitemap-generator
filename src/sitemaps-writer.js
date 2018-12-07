const writer = require('./writer');

const sitemapsWriter = async ({list, filepath}) => {
  // Prepare sitemap xml file (with max number of files) TODO: make a module out of this functions
  const sitemapPre =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapPost = '</urlset>';

  const file = `${sitemapPre}${list}${sitemapPost}`;

  await writer({filepath, file});
};

module.exports = sitemapsWriter;
