// const express = require("express");
// const router = express.Router();
// let exe = require("../database/db.js");
// 
// // router.get("/",async function(req, res){
// //     let data = await exe('SELECT * FROM tbl2_home')
// //     res.render("user/home.ejs", {homedata : data[0]});
// // });
// 
// module.exports = router;


import express from "express";
import { db } from "../database/db.js";

const router = express.Router();

// Admission Form - GET
router.get("/admission", (req, res) => {
  res.render("user/admission");
});

// Admission Form - POST
router.post("/admission", async (req, res) => {
  const { name, email, dob, course, category, score } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO applications (name, email, dob, course, category, score) VALUES (?,?,?,?,?,?)",
      [name, email, dob, course, category, score]
    );

    res.render("user/success", { appId: result.insertId });
  } catch (err) {
    console.error(err);
    res.send("Error submitting form");
  }
});

export default router;
