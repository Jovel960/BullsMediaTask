const { Client } = require("pg");
const { PORT, USER, HOST, DB, PASSWORD } = require("../utils/config");

let dbClient = null;
//Init the db
async function initialize() {
  //New client connection instance
  let initDB = new Client({
    user: USER,
    host: HOST,
    database: DB,
    password: PASSWORD,
    port: PORT,
  });
  try {
    //Connecting to the DB
    await initDB.connect();
    console.log("Database connected successfully");
  } catch (err) {
    //Here we throws an error
    console.error("Database connection error:", err);
    throw err;
  }
  return initDB
}

//singleton pattern that make sure there is only one instance of the db client
async function getClient() {
  if (!dbClient) {
    dbClient = await initialize();
  }
  return dbClient;
}

//Close the connection
async function closeClient() {
  if (dbClient) await dbClient.end();
}

module.exports = { getClient, closeClient };
