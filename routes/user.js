const express = require("express");
const router = express.Router();
let exe = require("../database/db.js");

router.get("/",async function(req, res){
    let data = await exe('SELECT * FROM tbl2_home')
    res.render("user/home.ejs", {homedata : data[0]});
});

module.exports = router;