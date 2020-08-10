// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

const rootDir = path.join(__dirname, '../../');

function rootDirResolve(pathToFile) {
  return path.resolve(rootDir, pathToFile);
}

function appDirResolve(pathToFile) {
  return path.resolve(rootDir, './client/', pathToFile);
}

module.exports = {
  appDirResolve,
  rootDirResolve,
};
