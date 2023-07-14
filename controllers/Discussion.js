const {User,Questions,Discussion} = require("../model/model");

//****************** DISCUSSION API'S ****************** //
// 1. POSTING USER DISCUSSION
const discussion = async (req, res) => {
  try {
    const { quesId, topic, sol_txt, sol_img, username } = req.body;
    
    if(!quesId){return res.send({msg:"question id is invalid",status:400})};
    
    const user = await User.findOne({ username });
    const ques = await Questions.findById({ _id: quesId });
    if(!ques) {return res.send({msg:"Question not found",status:400})}
    if(!user) {return res.send({msg:"User not found",status:400})}

      const date = new Date().toLocaleDateString();
      const discussionObject = {
        topic,
        sol_txt,
        sol_img,
        username,
        createdAt: date,
      };
      const Newdiscussion = await Discussion.create(discussionObject);
      ques.discussion.push(Newdiscussion);
      ques.save();
    
      user.userSubmissions.push(Newdiscussion);
      user.save();
      res.send({ msg: "Solution submitted", status: 200 });
      
  } catch (error) {res.send({msg:"discussion post failed",status:500});}
  
  };
  
  // 2. UPDATING USER DISCUSSION
  const updatediscussion = async (req, res) => {
    const { discussionId, topic, sol_txt, sol_img, username } = req.body;
    const date = new Date().toLocaleDateString();
  
    console.log({ discussionId, topic, sol_txt, sol_img, username });
    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      { _id: discussionId },
      {
        topic,
        sol_txt,
        sol_img,
        username,
        date,
      },
      { new: true }
    );
    res.send({ msg: "Solution updated", status: 200 });
  };
  
  // UPDATING UPVOTE AND DOWNVOTE OF THE DISCUSSION
  const upvote_downvote_discussion = async (req, res) => {
    const { status, discussionId } = req.body;
    if (status == "upvote") {
      const updatedDiscussion = await Discussion.findByIdAndUpdate(
        { _id: discussionId },
        {
          $inc: { upvote: 1 },
        },
        { new: true }
      );
    } else {
      const updatedDiscussion = await Discussion.findByIdAndUpdate(
        { _id: discussionId },
        {
          $inc: { downvote: 1 },
        },
        { new: true }
      );
    }
    res.send({ msg: "upvote and downvote  updated", status: 200 });
  };



module.exports = {
    discussion,
    updatediscussion,
    upvote_downvote_discussion,
  };
  