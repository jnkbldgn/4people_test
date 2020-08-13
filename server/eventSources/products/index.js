const fs = require('fs');
const currency = require('../../utils/currency');
const pathUtils = require('../../utils/path');

const eventType = 'PRODUCTS';
let interval;

function readData() {
  const filePath = pathUtils.serverResolve('./data/data.json');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

function close() {
  clearInterval(interval);
}

function getProducts(req, res) {
  function send() {
    readData()
      .then((data) => {
        const valueUSD = currency.getUSD();
        data.Value.Goods = data.Value.Goods.map((item) => {
          item.C = parseFloat((item.C * valueUSD).toFixed(2), 10);
          return item;
        });
        res.write(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`);
        res.flush();
      });
  }
  try {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    interval = setInterval(send, 15000);
    send();
    req.on('close', close);
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getProducts,
};
