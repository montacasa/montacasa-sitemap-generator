const fileConfigurator = ({domain, number, filepath}) => {
  const name = `sitemap-${number}.xml`;
  const fullPath = `${domain}/${name}`;
  const path = filepath.substring(0, filepath.lastIndexOf('/'));
  return {fullPath, path, name};
};

module.exports = fileConfigurator;
