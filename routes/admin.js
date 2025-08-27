import express from "express";
import conn from "../database/db.js";

const router = express.Router();

// Admin Dashboard
router.get("/", (req, res) => {
  res.render("admin/admin", { title: "Admin Dashboard" });
});

// Show all users
router.get("/users", (req, res) => {
  conn.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.render("admin/admin", { title: "User List", users: results });
  });
});

export default router;
