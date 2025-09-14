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

app.use(bodyParser.urlencoded({extended : true}));
// app.use(upload());

let conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : 'final_year_project'
});
*/

/*
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const upload = require("express-fileupload")

app.use(express.static("public"));
app.use(session({
    secret : "vip_tech_marathi",
    resave : false,
    saveUninitialized : true
}));

let exe = require("./database/db")

app.use(bodyParser.urlencoded({extended : true}));
app.use(upload());

let adminRoute = require("./routes/admin");
let userRoute = require("./routes/user");

app.use("/admin", adminRoute);
app.use("/", userRoute);

*/