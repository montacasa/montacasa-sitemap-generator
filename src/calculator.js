/**
 * Calculate number of ocurrences per file based on max.
 *
 * @param {Object} params
 * @param {Object} params.max The maximum number of ocurrences per file.
 * @param {Object} params.quantity The quantity to calculate from.
 * @returns {Number} Number of ocurrences.
 */
const calculator = params => {
  const {max, quantity} = params;
  const calculate = Math.ceil(quantity / max);
  return calculate;
};

module.exports = calculator;
