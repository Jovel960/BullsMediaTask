const { getClient } = require('../../db/db'); // Use CommonJS for imports

module.exports = (on, config) => {
  on('task', {
    async queryDatabase(query) {
      const client = await getClient()
      return await client.query(query);
    },
  });
};