const express=require("express");
const {getAccessToRoute,getAnswerOwnerAccess}=require("../middlewares/authorization/auth");
const {addNewAnswerToQuestion, getSingleAnswer,editAnswer,deleteAnswer,likeAnswer, undoLikeAnswer}=require("../controllers/answer");
const { checkAnswerExist } = require("../middlewares/database/databaseErrorHelpers");
const router=express.Router({mergeParams:true});

router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/:answer_id",checkAnswerExist,getSingleAnswer);
router.put("/:answer_id/edit",[getAccessToRoute,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id/delete",[getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);
router.get("/:answer_id/like",[getAccessToRoute,checkAnswerExist],likeAnswer);
router.get("/:answer_id/undoLike",[getAccessToRoute,checkAnswerExist],undoLikeAnswer);
module.exports=router;