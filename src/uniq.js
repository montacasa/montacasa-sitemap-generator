/**
 * Remaps an array and remove duplicates.
 *
 * @param {Array<any>} list Any array.
 * @returns {Array<any>} An unique array.
 */
const uniq = list => {
  const seen = {};
  return list.filter(item => {
    if (seen[item]) {
      return;
    }
    seen[item] = true;
    return item; // eslint-disable-line consistent-return
  });
};

module.exports = uniq;
