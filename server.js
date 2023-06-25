const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Questions , mathcodeUser , admin} = require("./model/model");
const connect = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config();

connect();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());


let user = [
  {
    username: "mohit",
    email: "rohitdhakad101@gmail.com",
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

app.post("/login", async (req, res) => {
  const { password, email } = req.body;
  const user = await mathcodeUser.find({ 'email':email.toLowerCase() });

  if (user.length == 0) {return res.send({ status: 400, msg: "user not found" })}
  const auth = await bcrypt.compare(password, user[0].password)

  console.log({auth,pass:user[0].password});
  if ( !auth ) { return res.send({ msg: "invalid credientials" , status:400})}
  res.status(200).send({ msg: "login succesfully", status:200, user: user[0] });
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  
  const oldUser = await mathcodeUser.find({'email':email.toLowerCase()});
  if(oldUser.length!=0){return res.send({msg:"user already exist",status:400})}

  const encryptedPassword = await bcrypt.hash(password,10);
  const newuser = await mathcodeUser.create({
    username,
    email:email.toLowerCase(),
    password:encryptedPassword,
    questions:[],
    token:'',
    pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&usqp=CAU',
  })
  const token = jwt.sign(
    {user_id: newuser._id, email},
    process.env.TOKEN_KEY,
    {expiresIn: "15d",}
  )

    newuser.token = token;
    await newuser.save();
  res.send({ msg: "user created", status:200,newuser });
});

app.get("/users", async (req, res) => {
  const users = await mathcodeUser.find();
  res.send({msg:"success",users});
});


app.get("/user", async (req, res) => {
  const {username} = req.query;
  const user = await mathcodeUser.find({username});
  res.send({msg:"succhhess",questions:user[0].questions});
});

app.get("/all", async (req, res) => {
  const question = await Questions.find();
  res.status(200).send(question);
});

// filtering //
app.post('/problem-set',async (req,res)=>{
  const {filters,username} = req.body;
  const {diff,topic,solved} = filters
  const question = await Questions.find();
  const user = await mathcodeUser.find({username});
  const solvedQues = user[0].questions;

  let filterQues = [];
  if(diff!='') filterQues = question.filter((item)=> item.Ques.difficulty==diff)
  else {filterQues = question;}

 if(solved=='solved'){filterQues = filterQues.filter(item=> solvedQues.includes(item._id))}

  if(filters.topic.length!=0){
    filterQues = filterQues.filter((item)=>{
      return (topic.includes(item.Ques.type))
    })
  }
  res.send({msg:"success",filterQues})
})

// when user do a question //
app.post("/userques", async (req, res) => {
  const { username, quesId } = req.body;
  const user = await mathcodeUser.find({username});
  const exist = user[0].questions.includes(quesId);
  if(!exist){
    user[0].questions.push(quesId);
    await user[0].save();
  }
  res.status(200).send({ msg: "success"});
});



app.post("/googleAuth", async (req, res) => {
  const { email } = req.body;
  const user = await mathcodeUser.find({email})
  if(user.length==0) return res.send({status:400,msg:"user not found"})
   res.send({status: 200,msg:"Logic successful",user:user[0]});
});




// ADMIN PANEL API'S //

app.post("/all", async (req, res) => {
  const { desc, corrAns, level, type, difficulty, isReviewed, options ,solution} = req.body;
  console.log(desc, corrAns, level, type, difficulty, isReviewed, options ,solution," ggg");
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

app.delete("/all/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  await Questions.deleteOne(filter);
  res.status(200).send({msg:"deleted",status:200});
});
app.put("/all/:id", async (req, res) => {
  const {Ques} = req.body
  const question = await Questions.findById(req.body.id);
  question.Ques = Ques
  question.save();
  res.status(200).send({id:req.body.id,question});
});

app.get("/all/:id", async (req, res) => {
  const id = req.params.id
  const question = await Questions.findById(id);
  console.log(question);
  res.send(question);
});

//---- FOR CREATING ADMIN USER ----//
// app.post('/adminAuth' , async (req,res)=>{
//   const {email,password} = req.body;
//   console.log({email,password});
//   const encryptedPassword = await bcrypt.hash(password,10);
//   const user = await admin.create({
//     email:email.toLowerCase(),
//     password:encryptedPassword,
//     token:'',
//   })
//   console.log(user);
//   const token = jwt.sign(
//     {user_id: user._id, email},
//     process.env.TOKEN_KEY,
//     {expiresIn: "15d",}
//   )
//   console.log({token});
//   user.token = token;
//   await user.save();
//   res.send({msg:'success',user})
// })

app.post('/adminAuth',async(req,res)=>{
  const {email,password} = req.body;
  console.log({email,password});
  const user = await admin.find({"email":email.toLowerCase()})
  console.log(user);
  if (user.length == 0) {return res.send({ status: 400, msg: "user not found" })}
  const auth = await bcrypt.compare(password, user[0].password)
  console.log({auth,pass:user[0].password});
  if ( !auth ) { return res.send({ msg: "invalid credientials" , status:400})}
  res.send({ msg: "login succesfully", status:200, user: user[0] });
})

app.get("/", (req, res) => {
  res.send({ status: 400, msg: "success" });
});
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT} 🔥`);
});
