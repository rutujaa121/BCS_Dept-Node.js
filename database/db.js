const express = require("express");
const mysql = require("mysql");
const util = require("util");

let conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : 'final_year_project'
});

let exe = util.promisify(conn.query).bind(conn);

module.exports = exe;

// 
// import mysql from "mysql2/promise";
// 
// // MySQL Database connection
// export const db = mysql.createPool({
//   host: "localhost",     // तुझं MySQL host (default localhost)
//   user: "root",          // MySQL username
//   password: "",          // MySQL password (जर ठेवला नसेल तर रिकामं ठेवा)
//   database: "final_year_project", // तुझं database नाव
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
