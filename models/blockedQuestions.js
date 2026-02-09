const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const BlockedQuestionsSchema=new Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    slug:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User" //User schemasi ile quesiton scheamasi baglandi
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    likeCount:{
        type:Number,
        default:0
    },
    answers:[{
        type:mongoose.Schema.ObjectId,
        ref:"Answer"

    }],
    answerCount:{
        type:Number,
        default:0
    }
});

module.exports = mongoose.model("BlockedQuestions", BlockedQuestionsSchema);