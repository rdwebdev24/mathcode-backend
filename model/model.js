const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    desc: { type: String, required: true },
    options: [{ type: String , required:true }],
    corrAns: { type: String, required: true },
    level: { type: String, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, required: true },
    solution: { type: String },
    likes: { type: Number },
    dislikes: { type: Number },
    submissions: { type: Number },
    isReviewed: { type: String ,required:true},
    discussion:[{ type: mongoose.SchemaTypes.ObjectId, ref: 'Discussion' }]
});

// Discussion schema for Questions
const discussionSchema = new Schema({
    topic:{type:String},
    sol_txt:{type:String},
    sol_img:{type:String},
    userId:{type:String},
    data:{type:Date},
    upvote:{type:Number},
    downvote:{type:Number},
    comments:[{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comments' }]
})

// Comments Schema on each question discussion 
const commentSchema = new Schema({
    userId:{type:String},
    comment:{type:String},
    date:{type:Date},
})
// Problem of the day schema 
const podSchema = new Schema({
    desc: { type: String, require: true },
    options: [{ type: String }],
    corrAns: { type: String, require: true },
    topic: { type: String, require: true },
    difficulty: { type: String, require: true },
    solution: { type: String },
    submissions: { type: Number , default:0 },
    isReviewed: { type: String },
});

const UserSchema = new Schema({
  username: { type: String, default: null , trim:true , unique:true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String , required:true },
  pic: { type: String , default:'../assets/user.png' },
  token: { type: String },
  score:{type:Number,default:0},
  userSubmissions:[{type:String}],
  solved: [{
        id: { type: String },
        previouswrong: { type: Number, default:0 },
        date:{type:Date},
    }],
  attempted: [{
        id: { type: String },
        previouswrong: { type: Number }
    }]
});

// Admin schema 
const AdminSchema = new Schema({
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  token: { type: String },
});

// User feedback Schema 
const feedbackSchema = new Schema({
    username:{type:String},
    userFeedback:{type:String},
    date:{type:String},
});

const User = mongoose.model("User", UserSchema);
const admin = mongoose.model("Admin", AdminSchema);
const Questions = mongoose.model("Questions", QuestionSchema);
const Discussion = mongoose.model("Discussion", discussionSchema);
const Comments = mongoose.model("Comments", commentSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);
const POD = mongoose.model("POD", podSchema);

module.exports = { User, Questions, admin,Feedback ,POD };
