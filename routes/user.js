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

// Notice page
router.get("/notice", (req, res) => {
  res.render("user/notice", { title: "Notice" });
});
export default router;
