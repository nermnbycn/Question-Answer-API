const Answer=require("../models/answer"); 
const Question=require("../models/question");
const User=require("../models/user");
const CustomError=require("../helpers/error/CustomError");
const asyncErrorWrapper=require("express-async-handler");


const addNewAnswerToQuestion=asyncErrorWrapper(async(req,res,next)=>{
     const {id}=req.params;
     const userId=req.user.id;

     const information=req.body;

     const answer=await Answer.create({
        ...information,
        question:id,
        user:userId
     });

     return res
     .status(200)
     .json({
        success:true,
        data:answer
     })

});



const getSingleAnswer=asyncErrorWrapper(async(req,res,next)=>{
     const {answer_id}=req.params;

     const answer=await Answer.findById(answer_id).populate("question").populate("user");

     return res
     .status(200)
     .json({
        success:true,
        data:answer
     });
});

const editAnswer=asyncErrorWrapper(async(req,res,next)=>{
    const editInformation=req.body;
    const {answer_id}=req.params;
    const oldanswer=await Answer.findById(answer_id);
    if(req.body.content!==oldanswer.content){ //eger kullanicinin girdigi content ile eski cevabin content icerigi ayni degilse
        const answer=await Answer.findByIdAndUpdate(answer_id,editInformation,{
           new:true,
           runValidators:true
    }).populate("question").populate("user");
    answer.save();
     return res //eger baska bir content degeri girildiyse basariyla degistir
        .status(200)
        .json({
           success:true,
           data:answer
        });
    };
    return next(new CustomError("The answer content cannot be the same as the old content value."));
});

const deleteAnswer=asyncErrorWrapper(async(req,res,next)=>{
    const {answer_id}=req.params;
    const {id}=req.params; //questionun id degeri
    await Answer.findByIdAndDelete(answer_id);
    const question=await Question.findById(id);
    question.answers.splice(question.answers.indexOf(answer_id),1);
    question.answerCount=question.answers.length;
    question.save();

    res.
    status(200)
    .json({
        success:true,
        message:"answer is deleted"
    });
});
const likeAnswer=asyncErrorWrapper(async(req,res,next)=>{
    const {answer_id}=req.params;
    const answer=await Answer.findById(answer_id);
    if(answer.likes.includes(req.user.id)){
        return next(new CustomError("You already like this answer",400));
    }
    answer.likes.push(req.user.id);
    answer.likeCount=answer.likes.length;
    await answer.save();
    res
    .status(200)
    .json({
        success:true,
        message:"Answer is liked",
        data:answer
    });
});

const undoLikeAnswer=asyncErrorWrapper(async(req,res,next)=>{
    const {answer_id}=req.params;
    const answer=await Answer.findById(answer_id);
    if(!answer.likes.includes(req.user.id)){
        return next(new CustomError("You cannot undo like this answer",400));
    }
    answer.likes.splice(answer.likes.indexOf(req.user.id),1);
    answer.likeCount=answer.likes.length;
    await answer.save();
    res
    .status(200)
    .json({
        success:true,
        message:"Answer is undo liked",
        data:answer
    });
});



module.exports={
    addNewAnswerToQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    undoLikeAnswer
}

