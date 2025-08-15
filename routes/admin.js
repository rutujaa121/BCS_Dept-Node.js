const express = require("express");
let bodyParser = require('body-parser');
const router = express.Router();
let exe = require("../database/db.js");
let isAuthenticate = require("../middleware/isAuth.js");

router.use(bodyParser.urlencoded({extended : true}));



router.get("/", function(req, res){
    res.render("admin/admin.ejs");
});
