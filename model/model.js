const mongoose =  require('mongoose');

const Schema = mongoose.Schema; 

const ques = new Schema({
    Ques:{
      desc:{ type: String,require:true},
      options:[{ type: String}],
      corrAns:{ type: String ,require:true},
      level:{ type: String ,require:true},
      type:{ type: String ,require:true},
      difficulty:{ type: String ,require:true},
      solution:{ type: String },
      likes:{type:Number},
      dislikes:{type:Number},
      submissions:{type:Number},
      isReviewed:{ type: String },
    },
})


const User = new Schema({
    username:{ type: String, default:null },
    email:{ type: String, unique: true,sparse:true},
    password:{ type: String },
    pic: {type:String},
    token: {type:String},
    solved: [{id: { type: String },previouswrong: { type: Number }}],
    attempted: [{id: { type: String },previouswrong: { type: Number }}],
    accuracy:{type:Number,default:0}
})

const Admin = new Schema({
    email:{ type: String, unique: true,sparse:true},
    password:{ type: String },
    token: {type:String},
})


const mathcodeUser = mongoose.model("mathcodeUser",User)
const Questions = mongoose.model("ques",ques)

const admin = mongoose.model("admin",Admin)
module.exports = {mathcodeUser,Questions , admin}
