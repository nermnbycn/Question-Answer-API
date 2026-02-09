const Question=require("../models/question");
const CustomError=require("../helpers/error/CustomError");
const asyncErrorWrapper=require("express-async-handler");


const askNewQuestion=asyncErrorWrapper(async(req,res,next)=>{
    const information=req.body;

    const question=await Question.create({
        ...information,
        user:req.user.id
    });
    res
    .status(200)
    .json({
        success:true,
        data:question
    });
});
const getAllQuestions=asyncErrorWrapper(async(req,res,next)=>{

    res
    .status(200)
    .json(res.queryResults)   //queryResults middlewareden return ile aliniyor
});
const getSingleQuestion=asyncErrorWrapper(async(req,res,next)=>{
      res
    .status(200)
    .json(res.queryResults) 
   
});
const editQuestion=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
    let question=await Question.findById(id);
    const {title,content}=req.body; //bodyden kullanicinin girdigi yeni soru bilgilerini aldik
    question.title=title;
    question.content=content;
    question=await question.save();

    res
    .status(200)
    .json({
        success:true,
        message:"Question updated successfully",
        data:question
    });
});
const deleteQuestion=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
    await Question.findByIdAndDelete(id);

    res
    .status(200)
    .json({
        success:true,
        message:"Question delete operation successful"
    });
});

const likeQuestions=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
    const question=await Question.findById(id);
    if(question.likes.includes(req.user.id)){
        return next(new CustomError("You already like this question",400));
    }
    question.likes.push(req.user.id);
    question.likeCount=question.likes.length;
    await question.save();
    res
    .status(200)
    .json({
        success:true,
        message:"Like added successfully"
    });
});
const undoLikeQuestions=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
    const question=await Question.findById(id);
    if(!question.likes.includes(req.user.id)){
        return next(new CustomError("You cannot unlike this question",400));
    }
    const index=question.likes.indexOf(req.user.id);
    question.likes.splice(index,1);
     question.likeCount=question.likes.length;
    await question.save();
    res
    .status(200)
    .json({
        success:true,
        message:"Question is undo liked"
    });
});



module.exports={
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestions,
    undoLikeQuestions
};