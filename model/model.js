const mongoose =  require('mongoose');

const Schema = mongoose.Schema; 
const User = new Schema({
    username:{ type: String, default:null },
    email:{ type: String, unique: true,sparse:true},
    password:{ type: String },
    pic: {type:String},
    token: {type:String},
    questions:[{ type: String , default:[]}],
})
const ques = new Schema({
    Ques:{
      desc:{ type: String,require:true},
      options:[{ type: String}],
      corrAns:{ type: String ,require:true},
      level:{ type: String ,require:true},
      type:{ type: String ,require:true},
      difficulty:{ type: String ,require:true},
      solution:{ type: String },
      isReviewed:{ type: String },
    },
})

const mathcodeUser = mongoose.model("mathcodeUser",User)
const Questions = mongoose.model("ques",ques)
module.exports = {mathcodeUser,Questions}
