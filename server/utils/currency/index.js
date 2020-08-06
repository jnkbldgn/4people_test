const MAX = 80;
const MIN = 20;

function getUSD() {
  return MIN + Math.round(Math.random() * MAX);
}

module.exports = {
  getUSD,
};
