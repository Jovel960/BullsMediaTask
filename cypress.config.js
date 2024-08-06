//Importing the getClient and closeClient
const { defineConfig } = require("cypress");
const { getClient, closeClient } = require("./db/db");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      //Setting up cypress task to interact with node env with cypress directly
      on("task", {
        //Cy task to establish db connectio, sending the query, return the rows or null, throws an error if occured
        async queryDatabase(query) {
          try {
            const client = await getClient();
            const result = await client.query(query);
            console.log(result.rows);
            return result.rows || null;
          } catch (error) {
            console.error(`Database query failed: ${error.message}`);
          }
        },
        //Cy teask to close the DB connection
        async closeDatabaseClient() {
          try {
            await closeClient();
            console.log("Database client closed");
            return null;
          } catch (error) {
            console.error(`Database connection failed: ${error.message}`);
          }
        },
      });
    },
  },
});
