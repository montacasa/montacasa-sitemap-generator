const fs = require('fs');

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
