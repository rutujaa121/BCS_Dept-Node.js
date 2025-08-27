// const express = require("express");
// let bodyParser = require('body-parser');
// const router = express.Router();
// let exe = require("../database/db.js");
// // let isAuthenticate = require("../middleware/isAuth.js");
// 
// router.use(bodyParser.urlencoded({extended : true}));
// 
// 
// router.get("/", function(req, res){
//     res.render("admin/admin.ejs");
// });


import express from "express";
import { db } from "../database/db.js";

const router = express.Router();

// Admin Dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM applications");
    res.render("admin/admin", { applications: rows });
  } catch (err) {
    console.error(err);
    res.send("Error loading applications");
  }
});

export default router;
