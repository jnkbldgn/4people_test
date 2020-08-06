const fs = require('fs');
const currency = require('../../utils/currency');
const pathUtils = require('../../utils/path');

function getProducts(req, res) {
  const valueUSD = currency.getUSD();
  const filePath = pathUtils.serverResolve('./data/data.json');
  const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
  data.Value.Goods = data.Value.Goods.map((item) => {
    item.C = parseFloat((item.C * valueUSD).toFixed(2), 10);
    return item;
  });
  res.send(data);
}

module.exports = {
  getProducts,
};
