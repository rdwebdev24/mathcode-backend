const cors = require("cors");
const express = require("express");
const connect = require("./config/db");
const bodyParser = require("body-parser");
const UserRoute = require("./routes/Route");
const AdminRoutes = require("./routes/AdminRoutes");
require("dotenv").config();
const { Questions, mathcodeUser, admin } = require("./model/model");
const {
  getSingleUser,
  login,
  register,
  Get_all_users,
  Get_all_questions,
  googleAuth,
  filterQues,
  user_do_Ques,
  userFeedback,
  discussion,
  Usercomments,
  UserSubcomments,
  updatediscussion,
  upvote_downvote_discussion,
  upvote_downvote_comment,
  UserDeletecomments,
} = require("./controllers/Controller");
const ObjectsToCsv = require("objects-to-csv");

connect();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/admin", AdminRoutes);

app.post("/login", login);
app.post("/register", register);
app.post("/googleAuth", googleAuth);
app.post("/feedback", userFeedback);

app.post("/discussion", discussion);
app.post("/UpdateDiscussion", updatediscussion);
app.post("/upvote_downvote_discussion", upvote_downvote_discussion);

app.post("/comment", Usercomments);
app.post("/subcomment", UserSubcomments);
app.post("/upvote_downvote_comment", upvote_downvote_comment);

app.post("/problems", filterQues);
app.post("/userques", user_do_Ques);

app.get("/users", Get_all_users);
app.get("/all", Get_all_questions);
app.get("/getSingleUser", getSingleUser);



app.get("/", (req, res) => {
  res.send({ status: 400, msg: "success" });
});
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT} 🔥`);
});
