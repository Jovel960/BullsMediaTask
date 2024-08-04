const { queryDatabase } = require('../../db/db'); // Use CommonJS for imports

module.exports = (on, config) => {
  on('task', {
    queryDatabase(query) {
      return queryDatabase(query);
    },
  });
};