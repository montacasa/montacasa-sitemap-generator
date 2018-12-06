const fs = require('fs');

function writer({filepath, file, message}) {
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