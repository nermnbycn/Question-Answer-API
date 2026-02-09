const mongoose=require("mongoose");
const slugify=require("slugify");

const Schema=mongoose.Schema;


const QuestionSchema=new Schema({
    title:{
        type:String,
        required:[true,"Please provide a title"],
        minlength:[10,"Please provide a title at least 10 charecters"],
        unique:true
    },
    content:{
        type:String,
        required:[true,"Please provide a content"],
        minlength:[20,"Please provide a title at least 20 charecters"]
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

QuestionSchema.pre("save",function(next){
    if(!this.isModified("title")){ //eger title degeri sonradan degismiyorsa bunu atla slugi tekrardan olusturmasini engelle 
        next();
    };
    this.slug=this.makeSlug();
    next();
});

QuestionSchema.methods.makeSlug=function(next){
    return slugify(this.title,{
      replacement: '-',  // replace spaces with replacement character, defaults to `-`
      remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
      lower: true,      // convert to lower case, defaults to `false`
      strict: false,     // strip special characters except replacement, defaults to `false`
      locale: 'vi',      // language code of the locale to use
      trim: true         // trim leading and trailing replacement chars, defaults to `true`
    })
}
module.exports=mongoose.model("Question",QuestionSchema);