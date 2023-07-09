const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  adminCreateQues,
  googleAuth,
  filterQues,
  user_do_Ques,
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

app.get("/users", Get_all_users);
app.get("/all", Get_all_questions);

app.post("/problems", filterQues);
app.post("/userques", user_do_Ques);
app.get("/getSingleUser", getSingleUser);


app.get("/", (req, res) => {
  res.send({ status: 400, msg: "success" });
});
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT} 🔥`);
});
