const pathUtils = require('../../utils/path');

function home(req, res) {
  try {
    const filePath = pathUtils.rootResolve('./dist/index.html');
    res.type('html');
    res.status(200);
    res.sendFile(filePath);
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = home;
