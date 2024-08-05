const { defineConfig } = require("cypress");
const { getClient, closeClient } = require("./db/db");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async queryDatabase(query) {
          try {
            const client = await getClient();
            const result = await client.query(query);
            console.log(result.rows);
            return result.rows || null;
          } catch (error) {
            throw new Error(`Database query failed: ${error.message}`);
          }
        },
        async closeDatabaseClient() {
          try {
            await closeClient();
            console.log("Database client closed");
            return null;
          } catch (error) {
            console.error(`Failed to close database client: ${error.message}`);
            throw error;
          }
        },
      });
    },
  },
});
