//init env variables
require("dotenv").config();

//load env variables
const PORT = process.env.PORT;
const USER = process.env.USER;
const HOST = process.env.HOST;
const DB = process.env.DB;
const PASSWORD = process.env.PASSWORD;

module.exports = { PORT, USER, HOST, DB, PASSWORD };
