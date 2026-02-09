const mongoose=require("mongoose");
const Question=require("./question");
const Schema=mongoose.Schema;

const AnswerSchema=new Schema({
    content:{
        type:String,
        required:[true,"Please provide a content"],
        minlegth:[10,"Please provide a content at least 10 characters"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    likes:[{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }],
    likeCount:{
        type:Number,
        default:0
    },
    question:[{
        type:mongoose.Schema.ObjectId,
        ref:"Question",
        required:true
    }],
    user:[{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }]

});

AnswerSchema.pre("save",async function(next){
    if(!this.isModified("user")){ 
        return next();
    };
    const question=await Question.findById(this.question);
    question.answers.push(this._id);
    question.answerCount=question.answers.length;
    await question.save();
    next();
});
module.exports=mongoose.model("Answer",AnswerSchema);

