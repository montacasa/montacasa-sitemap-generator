const writer = require('./writer');

const indexGenerator = async ({paths, filepath}) => {
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
    filepath,
    file: sitemapindex,
  });
};

module.exports = indexGenerator;
