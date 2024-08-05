const { defineConfig } = require("cypress");
const {getClient} = require("./db/db");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
    async queryDatabase(query) {
      try {
        const client = await getClient();
        const result = await client.query(query);
        return result.rows;
      } catch (error) {
        throw new Error(`Database query failed: ${error.message}`);
      }
    },
  });
    },
  },
});
