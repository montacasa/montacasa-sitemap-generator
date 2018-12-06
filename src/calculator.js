const calculator = ({max = 50000, quantity}) => {
  const calculate = Math.ceil(quantity / max);
  return calculate;
};

module.exports = calculator;
