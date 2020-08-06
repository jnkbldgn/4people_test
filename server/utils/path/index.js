const path = require('path');

const root = path.join(__dirname, '../../../');

function rootResolve(pathToFile) {
  return path.resolve(root, pathToFile);
}

module.exports = {
  rootResolve,
};
