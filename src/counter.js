const fs = require('fs');

/**
 * Counts number of lines within a file.
 *
 * @param {String} filePath The file path.
 * @returns {Promise<Number>} The resulting number.
 */
const countFileLines = filePath => {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    if (!filePath) {
      resolve(0);
    }
    /**
     * Opens a stream and reads the file
     *
     * @param {String} filePath
     */
    fs.createReadStream(filePath)
      .on('data', buffer => {
        let idx = -1;
        lineCount--; // Because the loop will run once for idx=-1
        do {
          idx = buffer.indexOf(10, idx + 1);
          lineCount++;
        } while (idx !== -1);
      })
      .on('end', () => {
        resolve(lineCount);
      })
      .on('error', reject);
  });
};

/**
 * Counts number of ocurrences of a file or array.
 *
 * @param {String|Array} origin The filepath or array to count from.
 * @returns {Promise<Number>|Number} The result.
 */
const counter = origin => {
  if (Array.isArray(origin)) {
    return origin.length;
  }
  return countFileLines(origin);
};

module.exports = counter;
