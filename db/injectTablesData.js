const { getClient } = require("./db");
const { injectDataQuery } = require("../utils/sqlQueryStrings");
async function injectData() {
  const client = await getClient();
  //wrapping the interaction with the db with try catch block
  try {
    //Perform db query
    await client.query(injectDataQuery);
    console.log("Data injected successfully!");
  } catch (err) {
    //Log the error cause
    console.error("Error injecting data:", err);
  } finally {
    //Close the db connection
    await client.end();
  }
}

injectData();

// module.export = { injectData };
