const { User, Questions, admin, Feedback, Discussion, Comments } = require("../model/model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { model } = require("mongoose");

const login = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.find({ email: email.toLowerCase() });

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

  const oldUser = await User.find({ email: email.toLowerCase() });

  if (oldUser.length != 0) {
    return res.send({ msg: "user already exist", status: 400 });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newuser = await User.create({
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
  const users = await User.find();
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

// USER FEEDBACK API 
const userFeedback = async (req,res) => {
  console.log('kk');
  const {username,userFeedback} = req.body;
  console.log({username,userFeedback});
  const date = new Date().toLocaleDateString();
  await Feedback.create({username,userFeedback,date});
  res.send({msg:"feedback submitted",status:200});
}

const date = new Date().toDateString();

console.log(date);

const googleAuth = async (req, res) => {
  const { email } = req.body;
  const user = await User.find({ email });
  if (user.length == 0) return res.send({ status: 400, msg: "user not found" });
  res.send({ status: 200, msg: "Logic successful", user: user[0] });
};

const filterQues = async (req, res) => {
  const { filters, username } = req.body;
  const { diff, topic, solved } = filters;
  const Class = filters.class;
  const question = await Questions.find();
  const user = await User.find({ username });

  var solvedQues = [];
  if (username != "user") solvedQues = user[0].questions;

  var filterQues = question;

  if (diff != "")
    filterQues = filterQues.filter((item) => item.Ques.difficulty == diff);
  if (Class != "")
    filterQues = filterQues.filter((item) => item.Ques.level == Class);

  if (filters.topic.length != 0) {
    filterQues = filterQues.filter((item) => {
      return topic.includes(item.Ques.type);
    });
  }

  if (diff == "" && Class == "" && topic.length == 0) filterQues = question;

  res.send({ msg: "success", filterQues });
};

const user_do_Ques = async (req, res) => {
  const { username, quesId, status } = req.body;
  const user = await User.find({ username });

  if (status == "solved") {
    const isSolved = user[0].solved.some(question => question.id === quesId);
    console.log({ isSolved });
    if (!isSolved) {
      const atmpQues = user[0].attempted.filter(question => question.id === quesId);
      var previouswrong = 0;
      
      if(atmpQues.length!=0) previouswrong = atmpQues[0].previouswrong
      user[0].solved.push({id:quesId,previouswrong});
      console.log({previouswrong,atmpQues});
      const ques = await Questions.findOneAndUpdate(
        { _id: quesId },
        { $inc: { "Ques.submissions": 1 } },
        { new: true }
      );

      const newAttemp = user[0].attempted.filter((atmpId) => atmpId.id != quesId);
      user[0].attempted = newAttemp;
      await user[0].save();

    }
  }
  if (status == "attempt") {
    const isAtmp = user[0].attempted.some(question => question.id === quesId);
    const isSolved = user[0].solved.some(question => question.id === quesId);
    console.log({isAtmp,isSolved});

    if (!isAtmp && !isSolved) {
      console.log('iff');
      user[0].attempted.push({id:quesId,previouswrong:1});
      await user[0].save();
    } 
    else if (isAtmp) {
      console.log('elseiff');
      await User.findOneAndUpdate(
          { "attempted.id": quesId },
          { $inc: { "attempted.$.previouswrong": 1 } },
          { new: true }
        )
        .then((updatedSolved) => {
          console.log(updatedSolved, " aaa");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  res.status(200).send({ msg: "success" });
};

const getSingleUser = async (req, res) => {
  const { username } = req.query;
  const user = await User.find({ username });
  if (user.length == 0 || user == null || user == undefined) {
    return res.send({ msg: "user not defined", data: [] });
  }
  res.send({ msg: "success", data: user[0] });
};


// posting discussion 
const discussion = async (req,res) => {
  const {quesId,topic,sol_txt,sol_img,username} = req.body;
  const date = new Date().toLocaleDateString();
  console.log({quesId,topic,sol_txt,sol_img,username});

  const discussionObject = {topic,sol_txt,sol_img,username,createdAt:date}
  const ques = await Questions.findById({_id:quesId});
  console.log(ques);
  const Newdiscussion = await Discussion.create(discussionObject);
  console.log(Newdiscussion);
  ques.discussion.push(Newdiscussion);
  ques.save();

  const user = await User.find({username});
  console.log(user);
  if(user.length!=0){
    user[0].userSubmissions.push(Newdiscussion);
    user[0].save();
  }
  res.send({msg:"Solution submitted",status:200})
}

// updating the discussion 
const updatediscussion = async (req,res) => {
  const {discussionId,topic,sol_txt,sol_img,username} = req.body;
  const date = new Date().toLocaleDateString();

  console.log({discussionId,topic,sol_txt,sol_img,username});
  const updatedDiscussion = await Discussion.findByIdAndUpdate({_id:discussionId}, {
    topic,
    sol_txt,
    sol_img,
    username,
    date
  }, { new: true });
  res.send({msg:"Solution updated",status:200})
}

// updating likes and dislikes in the discussion
const upvote_downvote_discussion = async (req,res) => {
  const {status,discussionId} = req.body;
  if(status=="upvote"){
    const updatedDiscussion = await Discussion.findByIdAndUpdate({_id:discussionId}, {
      $inc: { upvote: 1 },
    }, { new: true });
  }
  else{
    const updatedDiscussion = await Discussion.findByIdAndUpdate({_id:discussionId}, {
      $inc: { downvote: 1 },
    }, { new: true });
  }
  res.send({msg:"upvote and downvote  updated",status:200})
}

// comments on the discussion section
const Usercomments = async (req,res) => {
  const {discussionId,username,comment} = req.body;
  const date = new Date().toLocaleDateString();

  const commentObj = {username,comment,createdAt:date}
  const discussion = await Discussion.findById({_id:discussionId});
  const NewComment = await Comments.create(commentObj);
  discussion.comments.push(NewComment);
  discussion.save();
  
  res.send({msg:"Commented",status:200})
}

// Sub comments on the discussion section
const UserSubcomments = async (req,res) => {
  const {commentId,username,subcomment} = req.body;
  const date = new Date().toLocaleDateString();

  const SubcommentObj = {username,comment:subcomment,createdAt:date}
  const NewSubComment = await Comments.create(SubcommentObj);
  
  const Comment = await Comments.findById({_id:commentId});
  
  if(Comment){
    Comment.subcomment.push(NewSubComment)
    Comment.save();
  }
  
  res.send({msg:"replied to Comment",status:200})
}

// updating likes and dislikes in the comment
const upvote_downvote_comment = async (req,res) => {
  const {status,commentId} = req.body;
  if(status=="upvote"){
    await Comments.findByIdAndUpdate({_id:commentId}, {
      $inc: { upvote: 1 },
    }, { new: true });
  }
  else{
    await Comments.findByIdAndUpdate({_id:commentId}, {
      $inc: { downvote: 1 },
    }, { new: true });
  }
  res.send({msg:"upvote and downvote updated",status:200})
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
  userFeedback,
  discussion,
  Usercomments,
  UserSubcomments,
  upvote_downvote_comment,
  updatediscussion,
  upvote_downvote_discussion
};
