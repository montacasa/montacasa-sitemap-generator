const domainExtractor = url => {
  const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  const domain = matches && matches[1]; // domain will be null if no match is found
  return `https://${domain}`;
};

module.exports = domainExtractor;
