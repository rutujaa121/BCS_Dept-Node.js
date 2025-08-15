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