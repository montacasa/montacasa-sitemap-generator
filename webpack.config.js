/* global __dirname */
const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'sitemap-generator.js',
    library: 'generator',
    libraryTarget: 'umd',
    globalObject: "typeof self !== 'undefined' ? self : this", // Fix global window not defined
  },
  // Make fs available to the package
  node: {
    fs: 'empty',
  },
  externals: ['fs'],
};
