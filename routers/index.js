const express = require('express');
const question = require("./question");
const auth = require("./auth");
const users=require("./user");
const admin=require("./admin");
// /api
const router = express.Router();

router.use("/question",question);
router.use("/auth",auth);
router.use("/users",users);
router.use("/admin",admin);

module.exports = router; //disari aktarim yapmak icin