const pathUtils = require('../../utils/path');

function home(req, res) {
  const filePath = pathUtils.rootResolve('./dist/index.html');
  res.type('html');
  res.status(200);
  res.sendFile(filePath);
}

module.exports = home;
