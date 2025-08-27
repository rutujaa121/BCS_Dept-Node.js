/* import mysql from "mysql2/promise";

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
*/



/*
const mysql = require("mysql");
const util = require("util");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",       // तुझा MySQL user
  password: "",       // तुझा MySQL password
  database: "final_year_project"
});

// promise-based query बनवतो
const exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
export { conn, exe };
*/

import mysql from "mysql";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   
  database: "final_year_project" 
});

export default conn;
