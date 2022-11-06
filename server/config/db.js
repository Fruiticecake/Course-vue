const mysql = require("mysql");

const db = mysql.createPool({
  host: "119.23.73.9",
  user: "root",
  password: "xdclass.net168",
  database: "course",
});
const textSql = 'SELECT * FROM course.user;'
module.exports = db;