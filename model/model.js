const mongoose =  require('mongoose');

const Schema = mongoose.Schema; 
const User = new Schema({
    user:{
      username:{ type: String, required:true },
      email:{ type: String, unique: true },
      password:{ type: String ,require:true},
      pic: {type:String},
      questions:[{ type: Number , default:[]}],
    },
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
