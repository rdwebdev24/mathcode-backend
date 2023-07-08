const { mathcodeUser, Questions, admin } = require("../model/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { model } = require("mongoose");

const login = async (req, res) => {
  const { password, email } = req.body;

  const user = await mathcodeUser.find({ email: email.toLowerCase() });

  if (user.length == 0) {
    return res.send({ status: 400, msg: "user not found" });
  }

  const auth = await bcrypt.compare(password, user[0].password);

  if (!auth) {
    return res.send({ msg: "invalid credientials", status: 400 });
  }
  res.send({ msg: "login succesfully", status: 200, user: user[0] });
};

const register = async (req, res) => {
  const { username, password, email } = req.body;

  const oldUser = await mathcodeUser.find({ email: email.toLowerCase() });

  if (oldUser.length != 0) {
    return res.send({ msg: "user already exist", status: 400 });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newuser = await mathcodeUser.create({
    username,
    email: email.toLowerCase(),
    password: encryptedPassword,
    questions: [],
    token: "",
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&usqp=CAU",
  });

  const token = jwt.sign(
    { user_id: newuser._id, email },
    process.env.TOKEN_KEY,
    { expiresIn: "15d" }
  );

  newuser.token = token;
  await newuser.save();
  res.send({ msg: "user created", status: 200, user: newuser });
};

const Get_all_users = async (req, res) => {
  const users = await mathcodeUser.find();
  res.send({ msg: "success", users });
};

const Get_all_questions = async (req, res) => {
  const question = await Questions.find();
  res.status(200).send(question);
};

// ADMIN APIS //
const adminCreateQues = async (req, res) => {
  const {
    desc,
    corrAns,
    level,
    type,
    difficulty,
    isReviewed,
    options,
    solution,
  } = req.body;
  const newQuestion = await Questions.create({
    Ques: {
      desc,
      options,
      corrAns,
      level,
      type,
      difficulty,
      solution,
      isReviewed,
    },
  });
  question = await Questions.find();
  res.status(200).send(question);
};

const adminDeleteQues = async (req, res) => {
  const filter = { _id: req.params.id };
  await Questions.deleteOne(filter);
  res.status(200).send({ msg: "deleted", status: 200 });
};

const adminUpdateQues = async (req, res) => {
  const { Ques } = req.body;
  const question = await Questions.findById(req.body.id);
  question.Ques = Ques;
  question.save();
  res.status(200).send({ id: req.body.id, question });
};

const adminGetOneQues = async (req, res) => {
  const id = req.params.id;
  const question = await Questions.findById(id);
  res.send(question);
};

const adminAuth = async (req, res) => {
  const { email, password } = req.body;
  const user = await admin.find({ email: email.toLowerCase() });
  if (user.length == 0) {
    return res.send({ status: 400, msg: "user not found" });
  }
  const auth = await bcrypt.compare(password, user[0].password);
  if (!auth) {
    return res.send({ msg: "invalid credientials", status: 400 });
  }
  res.send({ msg: "login succesfully", status: 200, user: user[0] });
};

const googleAuth = async (req, res) => {
  const { email } = req.body;
  const user = await mathcodeUser.find({ email });
  if (user.length == 0) return res.send({ status: 400, msg: "user not found" });
  res.send({ status: 200, msg: "Logic successful", user: user[0] });
};

const filterQues = async (req, res) => {
  const { filters, username } = req.body;
  const { diff, topic, solved } = filters;
  const Class = filters.class;
  const question = await Questions.find();
  const user = await mathcodeUser.find({ username });

  
  var solvedQues = [];
  if(username!='user') solvedQues = user[0].questions;

  var filterQues = question;

  if(diff!="") filterQues = filterQues.filter((item) => item.Ques.difficulty == diff);
  if(Class!="") filterQues = filterQues.filter((item)=>item.Ques.level==Class)

  if (filters.topic.length != 0) {
    filterQues = filterQues.filter((item) => {
      return topic.includes(item.Ques.type);
    });
  }

  if(diff=="" && Class=="" && topic.length==0) filterQues = question
  
  res.send({ msg: "success", filterQues });
};

const user_do_Ques = async (req, res) => {

  const { username, quesId, status } = req.body;
  const user = await mathcodeUser.find({ username });
  console.log(user);

  if(status=="solved"){
    console.log('solved1');
    const exist = user[0].solved.includes(quesId)
    console.log({exist});
    if(!exist){
      console.log('solved');

      const ques = await Questions.findOneAndUpdate({ _id: quesId },{ $inc: { 'Ques.submissions': 1 } },{ new: true });
      console.log(ques);

      user[0].solved.push(quesId);

      const newAttemp = user[0].attempted.filter(atmpId=>atmpId!=quesId)
      user[0].attempted = newAttemp;

      await user[0].save();
    }
  }
  if(status=="attempt"){
    console.log('attemp1');
    const exist = user[0].attempted.includes(quesId)
    console.log({exist});
    if(!exist){
      console.log('attemp');
      user[0].attempted.push(quesId);
      await user[0].save();
    }
  }

  res.status(200).send({ msg: "success" });
};

const getSingleUser = async (req,res) => {
  const {username} = req.query;
  const user = await mathcodeUser.find({ username });
  if(user.length==0 || user==null || user == undefined) {return res.send({msg:"user not defined",data:[]})};
  res.send({msg:"success",data:user[0]})
}



module.exports = {
    getSingleUser,
    user_do_Ques,
    filterQues,
    googleAuth,
    adminAuth,
    adminDeleteQues,
    adminUpdateQues,
    adminGetOneQues,
    adminCreateQues,
    login,
    register,
    Get_all_users,
    Get_all_questions,
};
