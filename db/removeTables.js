const { getClient } = require("./db");
const { injectDataQuery } = require("../utils/sqlQueryStrings");
async function removeTables() {
  const client = await getClient();
  //wrapping the interaction with the db with try catch block
  try {
    //Perform db query
    await client.query(injectDataQuery);
    console.log("Tables removed successfully!");
  } catch (err) {
    console.error("Error removing data:", err);
  } finally {
    await client.end();
  }
}

removeTables();
