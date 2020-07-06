const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourpassword",
    database: "employee_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("We have been connected");
})

module.exports = connection;