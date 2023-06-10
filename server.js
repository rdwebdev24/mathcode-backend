const express = require("express");
const cors = require("cors");
const { Questions , mathcodeUser} = require("./model/model");
const connect = require("./config/db");
let { question } = require("./config/data");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
connect();
// require('./config/csvtojson')
// console.log(questions);

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

let user = [
  {
    username: "mohit",
    email: "mohit@123",
    password: "11111",
    question: [],
  },
  {
    username: "rohit",
    email: "singhanurag17042002@gmail.com",
    password: "11111",
    question: [],
  },
];

app.post("/login", (req, res) => {
  const { password, username } = req.body;
  const user_ = user.filter((item) => item.username == username);
  console.log(user_, " aaa");
  if (user_.length == 0)
    return res.send({ status: 400, msg: "user not found" });
  if (user_[0].password != password)
    res.status(401).send({ msg: "auth failed" });
  res.status(200).send({ msg: "success", user: user_[0] });
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log(username, password, email);
  // const olduser = user.filter((item) => item.username == username);
  // console.log(olduser);
  // if (olduser.length != 0)
  //   return res.send({
  //     status: 400,
  //     msg: "user already exist please login to continue",
  //   });
  // const newuser = { username, password, email, question: [] };
  // user.push(newuser);
  const newuser = await mathcodeUser.create({
    user:{
      username,
      email,
      password,
      pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&usqp=CAU',
    },
  })
  const user = newuser.user
  res.status(200).send({ msg: "sucess", user });
});

app.get("/register", (req, res) => {
  res.send(user);
});

app.get("/all", (req, res) => {
  res.status(200).send(question);
});

// when user do a question //
app.post("/addques", (req, res) => {
  const { username, quesId } = req.body;
  console.log(username, quesId);
  const user_ = user.filter((item) => item.username == username)[0];
  for (let i = 0; i < user.length; i++) {
    if (user[i].username == username) {
      user[i].question.push(quesId);
    }
  }
  console.log(user);
  res.status(200).send({ msg: "success", user_ });
});


// const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

app.post("/userlogin", (req, res) => {
  const { email } = req.body;
  const user_ = user.filter((item) => item.email == email);
  if(user_.length==0) return res.send({status:400,msg:"user not found"})
   res.send({status: 200,msg:"Logic successful",user_});
});




// ADMIN PANEL API'S //

app.post("/all", async (req, res) => {
  const { desc, corrAns, level, type, difficulty, isReviewed, options ,solution} = req.body;
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
});

app.delete("/all/:id", (req, res) => {
  question = question.filter((item) => item.id != req.params.id);
  res.status(200).send(question);
});

app.get("/all/:id", (req, res) => {
  // res.status(200).send(question[req.params.id]);
  res.status(200).send({ id: req.params.id, data: question[req.params.id] });
});

app.get("/", (req, res) => {
  res.send({ status: 400, msg: "success" });
});
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
