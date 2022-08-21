const mysql = require('mysql');
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Database Connected!");
});

module.exports = dbConn;