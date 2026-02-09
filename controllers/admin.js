const User=require("../models/user");
const Question=require("../models/question");
const Answer=require("../models/answer");
const BlockedUser=require("../models/blockedUser");
const BlockedQuestions=require("../models/blockedQuestions");
const BlockedAnswers=require("../models/blockedAnswers");
const mongoose = require("mongoose");
const asyncErrorWrapper=require("express-async-handler");

const blockUser = asyncErrorWrapper(async (req, res, next) => {
const { id } = req.params;
let user = await User.findById(id).select("+password");
if (!user) {
    const blockedUser = await BlockedUser.findById(id).select("+password");
     const restoredUser = new User({
        _id: blockedUser._id,
        name: blockedUser.name,
        email: blockedUser.email,
        password: blockedUser.password,
        role: blockedUser.role,
        blocked: false,
        createdAt: blockedUser.createdAt,
        profile_image:blockedUser.profile_image
    });
    restoredUser._skipPasswordHash = true; //gecici bayrak sifrenin tekrardan hashlenmemesi icin 
    await restoredUser.save();
    await blockedUser.deleteOne(); // burada user zaten BlockedUser objesi

     const blockedQuestions = await BlockedQuestions.find({ user: id });
     const restoredQuestions = blockedQuestions.map(q => ({
            _id: q._id,
            user: q.user,
            title: q.title,
            slug:q.slug,
            content: q.content,
            createdAt: q.createdAt,
            likes:q.likes,
            likeCount:q.likeCount,
            answers:q.answers,
            answerCount:q.answerCount
        }));

        await Question.insertMany(restoredQuestions); // Soruları geri ekle
        await BlockedQuestions.deleteMany({ user: id }); // BlockedQuestion kayıtlarını sil

        const blockedAnswers=await BlockedAnswers.find({user:id}); //kullanicinin tum cevaplarini alma
        const restoredAnswers=blockedAnswers.map(a=>({
            _id:a._id,
            content:a.content,
            createdAt:a.createdAt,
            likes:a.likes,
            likeCount:a.likeCount,
            user:a.user,
            question:a.question
        }));

        await Answer.insertMany(restoredAnswers);
        await BlockedAnswers.deleteMany({user:id})

    return res.status(200).json({
        success: true,
        message: "User unblocked and restored to Users",
    });
   };


    const questions=await Question.find({user:id});
    const blockedQuestions=questions.map(q=>({
        _id:q._id,
        user:q.user,
        title:q.title,
        slug:q.slug,
        content:q.content,
        createdAt:q.createdAt,
        likes:q.likes,
        likeCount:q.likeCount,
        answers:q.answers,
        answerCount:q.answerCount
    }));

    await BlockedQuestions.insertMany(blockedQuestions);
    await Question.deleteMany( {user: new mongoose.Types.ObjectId(id)}); //idsi eslenen tum sorulari siler

    // Kullanıcının beğendiği tüm soruları alıyoruz
    const likedQuestions = await Question.find({ likes: id });
    console.log(likedQuestions);

    for (const q of likedQuestions) {
    const userIndex = q.likes.indexOf(id);
        q.likes.splice(userIndex, 1); // user like'ını kaldır
        q.likeCount = q.likes.length; // likeCount'u güncelle
        await q.save();
    }

      const answers=await Answer.find({user:id});
      const blockedAnswers=answers.map(a=>({
        _id:a._id,
        content:a.content,
        createdAt:a.createdAt,
        likes:a.likes,
        likeCount:a.likeCount,
        user:a.user,
        question:a.question
    }));

    await BlockedAnswers.insertMany(blockedAnswers);
    await Answer.deleteMany({user:id});

    const likedAnswers=await Answer.find({likes:id});

    for (const a of likedAnswers) {
    const userIndex = a.likes.indexOf(id);
        a.likes.splice(userIndex, 1); // user like'ını kaldır
        a.likeCount = a.likes.length; // likeCount'u güncelle
        await a.save();
    }


    const blockedUser = new BlockedUser({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        blocked: true,
        createdAt: user.createdAt,
        profile_image:user.profile_image,
        blockDate:Date.now()
    });
    await blockedUser.save();
    await user.deleteOne(); 

    return res.status(200).json({
        success: true,
        message: "User blocked and moved to BlockedUsers",
    });
   });

   const deleteQuestion=asyncErrorWrapper(async(req,res,next)=>{
        const {id}=req.params;

        const question=await Question.findById(id);
        await Answer.deleteMany({question:id});
        await question.deleteOne();

        return res
        .status(200)
        .json({
            success:true,
            message:"Delete Operation successfull"
        });
   });


const deleteUser=asyncErrorWrapper(async(req,res,next)=>{ //kullaniciyi tamamen siler
     const {id}=req.params;

     const user=await User.findById(id);

     if(user.role==="user"){
        await user.deleteOne();
        return res
        .status(200)
        .json({
          success:true,
          message:"Delete Operation Successfull"
        });
     };
     res
     .status(401)
     .json({
        success:false,
        message:"Admin can not be deleted"
     });
});

module.exports={
    blockUser,
    deleteQuestion,
    deleteUser
   
};