const mongoose = require("mongoose");

const BlockedUserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true 
  },
  email:{
    type:String, 
    required: true 
  },
  password:{ 
    type: String,
    required: true 
  }, // hashli olarak kalsın
  role:{ 
    type: String,
    default: "user" 
  },
  profile_image:{
    type:String
  },
  blocked:{ 
    type: Boolean, 
    default: true
  },
    createdAt:{
        type: Date
  },
}, { timestamps: true });

module.exports = mongoose.model("BlockedUser", BlockedUserSchema);

