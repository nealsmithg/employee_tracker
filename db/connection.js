const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "cms_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;