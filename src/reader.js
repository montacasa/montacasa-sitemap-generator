const fs = require('fs');

/**
 * Reades a file.
 *
 * @param {String} filepath The file path.
 * @returns {Promise<any>} The file data.
 */
function reader(filepath) {
  return new Promise((resolve, reject) => {
    let data = '';

    const readStream = fs.createReadStream(filepath, 'utf8');

    readStream
      .on('error', error => reject(error))
      .on('data', chunk => {
        data += chunk;
      })
      .on('end', () => {
        resolve(data);
      });
  });
}

module.exports = reader;
