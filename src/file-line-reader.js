const fs = require('fs');

const fileLineReader = (file, func) => {
  return new Promise((resolve, reject) => {
    // Read file line by line
    let remaining = '';
    const lineFeed = '\n';

    function _processLine(line) {
      func(line);
    }
    fs.createReadStream(file, {encoding: 'utf-8'})
      .on('data', function(chunk) {
        // store the actual chunk into the remaining
        remaining = remaining.concat(chunk);

        // look that we have a linefeed
        const lastLineFeed = remaining.lastIndexOf(lineFeed);

        // if we don't have any we can continue the reading
        if (lastLineFeed === -1) {
          return;
        }

        const current = remaining.substring(0, lastLineFeed),
          lines = current.split(lineFeed);

        // store from the last linefeed or empty it out
        remaining =
          lastLineFeed > remaining.length
            ? remaining.substring(lastLineFeed + 1, remaining.length)
            : '';

        for (let i = 0, length = lines.length; i < length; i++) {
          // process the actual line
          _processLine(lines[i]);
        }
      })
      .on('error', err => {
        reject(err);
      })
      .on('end', function() {
        // TODO I'm not sure this is needed, it depends on your data
        // process the reamining data if needed
        if (remaining.length > 0) {
          _processLine(remaining);
        }
        resolve();
      });
  });
};

module.exports = fileLineReader;
