require('ts-node/register/transpile-only');

module.exports = [require('./src/database/database.module').dbConfigUsers, require('./src/database/database.module').dbConfigCats];
