const express = require("express");
const cors = require("cors");
require("dotenv").config();
let { question } = require("./config/data");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');

// require('./config/csvtojson')
// console.log(questions);

const PORT = process.env.PORT;
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
    email: "rohit@123",
    password: "11111",
    question: [],
  },
];

app.post("/login", (req, res) => {
  const { password, username } = req.body;
  const user_ = user.filter((item) => item.username == username);
  console.log(user_, " aaa");
  if(user_.length==0) return res.send({status:400,msg:"user not found"})
  if (user_[0].password != password)
    res.status(401).send({ msg: "auth failed" });
  res.status(200).send({ msg: "success", user: user_[0] });
});

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  const olduser = user.filter((item)=>item.username==username);
  console.log(olduser);
  if(olduser.length!=0) return res.send({status:400,msg:"user already exist please login to continue"})
  const newuser = { username, password, email, question: [] };
  user.push(newuser);
  res.status(200).send({ msg: "sucess", user: newuser });
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


// ADMIN PANEL API'S //

app.post('/all',(req,res)=>{
  const {desc,corrAns,level,type,difficulty,isReviewed,opt} = req.body;
  question.push({...req.body,id:uuidv4()})
  res.status(200).send(question);
})

app.delete('/all/:id',(req,res)=>{
  question = question.filter((item)=>item.id!=req.params.id);
  res.status(200).send(question);
})

app.get('/all/:id',(req,res)=>{
  // res.status(200).send(question[req.params.id]);
  res.status(200).send({id:req.params.id,data:question[req.params.id]});
})

app.get("/", (req, res) => {
  res.send({ status: 400, msg: "success" });
});
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
