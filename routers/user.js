const express=require("express");
const User=require("../models/user");
const {getSingleUser,getAllUsers}=require("../controllers/user");
const {checkUserExist}=require("../middlewares/database/databaseErrorHelpers");
const userQueryMiddleware=require("../middlewares/query/userQueryMiddleware");

const router=express.Router();

router.get("/getAllUsers",userQueryMiddleware(User),getAllUsers);
router.get("/:id",checkUserExist,getSingleUser);

module.exports=router;