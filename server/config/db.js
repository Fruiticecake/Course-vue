require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
const textSql = "SELECT * FROM course.user;";
module.exports = db;
