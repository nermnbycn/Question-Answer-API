const express = require('express');
const answer=require("./answer");
const question=require("../models/question");
const {askNewQuestion,getAllQuestions, getSingleQuestion,editQuestion,deleteQuestion,likeQuestions,undoLikeQuestions}=require('../controllers/question');
const {getAccessToRoute,getQuestionOwnerAccess}=require("../middlewares/authorization/auth");
const {checkQuestionExist}=require("../middlewares/database/databaseErrorHelpers");
const questionQueryMiddleware=require("../middlewares/query/questionQueryMiddleware");
const answerQueryMiddleware = require("../middlewares/query/answerQueryMiddleware");
const router = express.Router();

router.get("/getAllQuestions",questionQueryMiddleware(question,{
    population:{
        path:"user",
        select:"name profile_image"
    }
}),getAllQuestions); 
router.get("/:id/like",[getAccessToRoute,checkQuestionExist],likeQuestions);
router.get("/:id/undo_like",[getAccessToRoute,checkQuestionExist],undoLikeQuestions);
router.post("/ask", getAccessToRoute,askNewQuestion);
router.get("/:id",checkQuestionExist,answerQueryMiddleware(question,{
    population:[
        {
            path:"user",
            select:"name profile_image"
        },
        {
            path:"answers",
            select:"content"
        }
    ]
}),getSingleQuestion);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion);
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);


router.use("/:id/answer",checkQuestionExist,answer);


module.exports = router; //disari aktarim yapmak icin