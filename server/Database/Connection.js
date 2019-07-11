const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pahinungod',
  multipleStatements: false
})

module.exports = connection;