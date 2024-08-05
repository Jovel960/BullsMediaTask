const { getClient } = require("./db");
const { createTablesQuery } = require("../utils/sqlQueryStrings");
async function createTables() {
  //Getting the DB instance
  const client = await getClient();
  //wrapping the interaction with the db with try catch block
  try {
    //Perform db query
    await client.query(createTablesQuery);
    console.log("Tables created successfully!");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await client.end();
  }
}

createTables();
