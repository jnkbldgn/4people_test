const fs = require('fs');
const currency = require('../../utils/currency');
const pathUtils = require('../../utils/path');

const eventType = 'PRODUCTS';
let interval;

function readData() {
  const valueUSD = currency.getUSD();
  const filePath = pathUtils.serverResolve('./data/data.json');
  const data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
  data.Value.Goods = data.Value.Goods.map((item) => {
    item.C = parseFloat((item.C * valueUSD).toFixed(2), 10);
    return item;
  });
  return data;
}

function close() {
  clearInterval(interval);
}

function getProducts(req, res) {
  function send() {
    const data = readData();
    res.write(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`);
  }
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
  });
  interval = setInterval(send, 15000);
  req.on('close', close);
}

module.exports = {
  getProducts,
};
