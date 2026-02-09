const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockedAnswerSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User"
  },
  question: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Question"
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ],
  likeCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("BlockedAnswer", BlockedAnswerSchema);
