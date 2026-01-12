const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP
  database: 'vms_tactical',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool.promise(); // Using promises for cleaner code