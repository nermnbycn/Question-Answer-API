const CustomError=require("../../helpers/error/CustomError");
const User=require("../../models/user");
const Question=require("../../models/question");
const Answer=require("../../models/answer");
const asyncErrorWrapper=require("express-async-handler");
const jwt=require("jsonwebtoken");
const {isTokenIncluded,getAccessTokenFromHeader}=require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute=(req,res,next)=>{
    const {JWT_SECRET_KEY}=process.env;
    if(!isTokenIncluded(req)){
        //401 Unauthorizated (giris yapmadan sayafaya erismek)
        //403 adminlerin erisebilecegi sayfaya erismeye calismak
        return next(new CustomError("You are not authorized to access this route",401));
      
    }
    const accessToken=getAccessTokenFromHeader(req);

    jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            return next(new CustomError("You are not authorized to access this route",401))
        }
        req.user={
            id:decoded.id,
            name:decoded.name
        }
        next();
    });
}

    const getAdminAccess=asyncErrorWrapper(async(req,res,next)=>{
        const {id}=req.user;
        const user=await User.findById(id);
        if(user.role!=="admin"){
            return next(new CustomError("Only admins can access this route"));
        }
        next();
    });

     const getQuestionOwnerAccess=asyncErrorWrapper(async(req,res,next)=>{
        const userId=req.user.id;
        const {id}=req.params;
        const question=await Question.findById(id);

        if(question.user.toString() !== userId){
            return next(new CustomError("Only owner can handle this question",403));
        }
        next();
    });

     const getAnswerOwnerAccess=asyncErrorWrapper(async(req,res,next)=>{
        const userId=req.user.id;
        const {answer_id}=req.params;
        const answer=await Answer.findById(answer_id);

        if(answer.user.toString() !== userId){
            return next(new CustomError("Only owner can handle this answer",403));
        }
        next();
    });




module.exports={
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwnerAccess,
    getAnswerOwnerAccess
};