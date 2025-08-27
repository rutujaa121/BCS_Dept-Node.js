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

// Admission form page
router.get("/admission", (req, res) => {
  res.render("user/admission"); // views/user/admission.ejs
});

// Admission form submit
router.post("/admission", async (req, res) => {
  const { name, dob, course, category, score } = req.body;

  try {
    await db.query(
      "INSERT INTO `tbl_01-admission` (name, dob, course, category, score) VALUES (?, ?, ?, ?, ?)",
      [name, dob, course, category, score]
    );
    res.send("🎉 Admission form submitted successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data");
  }
});

export default router;
