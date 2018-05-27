const {
  getArchEnemy,
  getFile,
  getFileMany,
  getSuperHeroes
} = require('./utils/index');

function blockingEcho(str) {
  let endTime = Date.now() + 3000;
  while (endTime > Date.now()) return str;
}

module.exports = blockingEcho;
