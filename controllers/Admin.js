const bcrypt = require("bcryptjs");
const {Questions,admin} = require("../model/model");

//*************** ADMIN APIS ****************//
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



module.exports = {
    adminAuth,
    adminDeleteQues,
    adminUpdateQues,
    adminGetOneQues,
    adminCreateQues,
  };
  