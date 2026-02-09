const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto=require("crypto");
const Schema=mongoose.Schema;
const Question=require("./question");


const UserSchema=new Schema ({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    email:{
        type:String,
        required:[true,"please provide a e-mail"],
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]//rol olarak sadece user veya admin degeri atanabilir
    },
    password:{
        type:String,
        minlength:[6,"Please provide a password with minlength:6"],
        required:[true,"Please provide a password"],
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    title:{
        type:String
    },
    about:{
        type:String
    },
    place:{
        type:String
    },
    website:{
        type:String
    },
    profile_image:{
        type:String,
        default:"default.jpg"
    },
    blocked:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }
    
})

UserSchema.methods.generateJwtFromUser=function(){
    const{JWT_SECRET_KEY,JWT_EXPIRE}=process.env;
    const payload={
        id:this._id,
        name:this.name
    };

    const token=jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    });
    return token;
}

UserSchema.methods.getResetPasswordTokenFromUser=function(){
    const randomHexString=crypto.randomBytes(15).toString("hex");
    const{RESET_PASSWORD_EXPIRE}=process.env;
    const resetPasswordToken=crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

    this.resetPasswordToken=resetPasswordToken;
    this.resetPasswordExpire=Date.now()+ parseInt(RESET_PASSWORD_EXPIRE);

    return resetPasswordToken;
};

UserSchema.pre("save", function(next
) {
    if (this._skipPasswordHash) return next(); //gecici bayragin kullanim yeri
    if(!this.isModified("password")){
        return next(); //kullanici sifre haric baska ozellik degistirdiginde tekrardan kaydedecek bu sekilde tekrardan hashalenmeyi onleyecegiz
    }
    bcrypt.genSalt(10,(err,salt) =>{
        if(err) next(err);
        bcrypt.hash(this.password,salt,(err,hash)=>{
          if(err) next(err); 
          this.password=hash;
          next();
    })
    })
});

UserSchema.post("deleteOne",{document: true, query: false },async function(next){
    await Question.deleteMany({
        user:this._id
    });
});


module.exports=mongoose.model("User",UserSchema);