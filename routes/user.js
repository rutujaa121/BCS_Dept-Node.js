import express from "express";
import conn from "../database/db.js";

const router = express.Router();

// Home page
router.get("/", (req, res) => {
  res.render("user/home", { title: "Home" });
});

// About page
router.get("/about", (req, res) => {
  res.render("user/about", { title: "About Us" });
});

// Admission page
router.get("/admission", (req, res) => {
  res.render("user/admission", { title: "Admission" });
});

// Notice page
router.get("/notice", (req, res) => {
  res.render("user/notice", { title: "Notice" });
});

// Registration page
router.get("/registration", (req, res) => {
  res.render("user/registration", { title: "Registration" });
});


export default router;
