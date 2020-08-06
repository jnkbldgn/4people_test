const path = require('path');

const root = path.join(__dirname, '../../../');

function rootResolve(pathToFile) {
  return path.resolve(root, pathToFile);
}

function serverResolve(pathToFile) {
  return path.resolve(root, './server/', pathToFile);
}

module.exports = {
  rootResolve,
  serverResolve,
};
