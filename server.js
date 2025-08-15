const express = require('express');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const util = require("util");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

let conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : 'batch1_node_js'
});

let exe = util.promisify(conn.query).bind(conn);

app.get("/",async function(req, res){

    let data = await exe('SELECT * FROM tbl_user_data');
    res.render("home.ejs", {data : data});
});

app.listen(2000, function(){
    console.log("Server Start")
});