const fs = require('fs');

/**
 * Writes data to a file using file system.
 *
 * @param {Object} params
 * @param {String} params.filepath The file path to write to.
 * @param {String} params.file The file content data.
 * @param {String} [params.message] The final message.
 * @returns {Promise<String>} The message.
 */
function writer(params) {
  const {filepath, file, message = ''} = params;
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, file, error => {
      if (error) {
        reject(error);
      }
      resolve(message);
    });
  });
}

module.exports = writer;
