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
    //Log the error cause
    console.error("Error removing data:", err);
  } finally {
    //Close the db connection
    await client.end();
  }
}

removeTables();
