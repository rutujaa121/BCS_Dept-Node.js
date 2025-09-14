import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import conn from "./database/db.js";
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";

const app = express();
// const PORT = 3000;

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/admin", adminRoutes);
app.use("/", userRoutes);

// DB check
// conn.connect((err) => {
//   if (err) throw err;
//   console.log("✅ Database connected!");
// });

// Start server
app.listen(4000, () => {
  console.log("🚀 Server running on 4000");
});


/*

// Project Setup 
// npm i express ejs mysql util body-parser express-fileupload express-session 
// 4 folder create 
// bcs_dept_node.js
    //  views
            // admin 
                // home.ejs
            // user
                // home.ejs
    //  routes
            // admin.js
            // user.js
    //  database
            // db.js
    //  public

const express = require('express');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const util = require("util");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
// app.use(upload());

let conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : 'final_year_project'
});

let exe = util.promisify(conn.query).bind(conn);
app.use(express.static('public'));
app.get("/",async function(req, res){

    let data = await exe('SELECT * FROM tbl_01_user_data');
    res.render("user/home.ejs", {data : data});
});


let adminRoute = require("./routes/admin");
let userRoute = require("./routes/user");
// 
// app.use("/admin", adminRoute);
// app.use("/", userRoute);


app.listen(2000, function(){
    console.log("Server Start")
});
*/



/*
// Project Setup 
// npm i express ejs mysql util body-parser express-fileupload express-session 
// 4 folder create 
// 20_portfolio_Project
    //  views
            // admin 
                // home.ejs
            // user
                // home.ejs
    //  routes
            // admin.js
            // user.js
    //  database
            // db.js
    //  public

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const upload = require("express-fileupload")
const app = express();

app.use(express.static("public"));
app.use(session({
    secret : "vip_tech_marathi",
    resave : false,
    saveUninitialized : true
}));

let exe = require("./database/db")

app.use(async function(req, res, next) {
    res.locals.data = req.session.user || null;
    res.locals.userInfo = {data : null};

    if(req.session.user){
        try{
            let id = req.session.user.id;
            let sql = `SELECT * FROM tbl2_home WHERE id = '${id}'`;
            let result = await exe(sql);

            res.locals.userInfo = {
                data: result[0] || {}
            }
        }
        catch(err){
            console.log("header error : ", err)
        }
    }
    next();
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(upload());

let adminRoute = require("./routes/admin");
let userRoute = require("./routes/user");

app.use("/admin", adminRoute);
app.use("/", userRoute);

app.listen(3000, () => {
    console.log("Project Start on PORT 3000")
});
*/