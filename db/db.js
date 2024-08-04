const Client = require("pg");
const { PORT, USER, HOST, DB, PASSWORD } = require("../utils/config");

let dbClient = null;

//init the db
function initialize() {
  const initDB = new Client({
    user: USER,
    host: HOST,
    database: DB,
    password: PASSWORD,
    port: PORT,
  });
  initDB.connect();
  return initDB;
}

//ssingleton pattern that make sure there is only one instance of the db cleint
function getClient() {
  if (!dbClient) {
    dbClient = initialize();
  }
  return dbClient;
}

//perform a query in db
const queryDatabase = (query) => {
  return new Promise((resolve, reject) => {
    getClient().query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows);
      }
    });
  });
};

//Close the connection
function close_client() {
  if (dbClient) dbClient.end();
}

module.exports = { getClient, close_client, queryDatabase };
