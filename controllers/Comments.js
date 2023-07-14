const { Discussion,Comments } = require("../model/model");

//******************  COMMENTS API'S ******************//
// 1. USER DO COMMENT ON DISCUSSION
const Usercomments = async (req, res) => {
    try {
      // getting the data from the body
      const { discussionId, username, comment } = req.body;
      // checking of all the required filed are valid or not
      if (!discussionId) {return res.send({msg:"discussionId is not valid",status:400})}
      if (!comment || comment.trim().length==0) {return res.send({msg:"comment can't be empty",status:400})}
      // creating a new comment object 
      const date = new Date().toLocaleDateString();
      const commentObj = { username, comment, createdAt: date };
      // getting thediscussion obj to which the comment will be added
      const discussion = await Discussion.findById({ _id: discussionId });
      if(!discussion) {return res.send({msg:"discussion not found",status:400})}
      // creating a new comment  
      const NewComment = await Comments.create(commentObj);
      discussion.comments.push(NewComment);
      // saving it to model
      discussion.save();
      res.send({ msg: "Commented successfully", status: 200 });
      // habdling errors
    } catch (error) {return res.send({msg:"failed to post comment",status:500})}
  };
  
  // 2. USER DO SUB-COMMENT ON DISCUSSION
  const UserSubcomments = async (req, res) => {
    try {
      // getting data from req body
      const { commentId, username, comment } = req.body;
      // checking for valid comment id and comment
      if (!commentId) {return res.send({msg:"commentId  is not valid",status:400})}
      if (!comment || comment.trim().length==0) {return res.send({msg:"comment can't be empty",status:400})}
      // creating a subcomment object
      const date = new Date().toLocaleDateString();
      const SubcommentObj = { username, comment, createdAt: date };
      // finding the comment if exist 
      const Comment = await Comments.findById({ _id: commentId });
      if (!Comment) {return res.send({msg:"comment not found",status:400})};
      // adding the subcomment to the comment array 
      Comment.subcomment.push(SubcommentObj);
      Comment.save();
      // sending response to the frontend
      res.send({ msg: "successfully replied to Comment", status: 200 });
  
    } catch (error) {return res.send({msg:"failed to comment",status:500})}
    
  };
  
  // 3. USER DO UPVOTE OR DOWNVOTE ON COMMENT OR SUBCOMMENT
  const upvote_downvote_comment = async (req, res) => {
    try {
        const {status,commentId} = req.body;
        // checking valud status and comment id
        if (!commentId) {return res.send({msg:"commentId  is not valid",status:400})}
        if(!status || status.trim().length==0){return res.send({msg:"status is invalid",status:400})}
        // if upvote increase upvote by 1
        if (status == "upvote") {
           const a = await Comments.findByIdAndUpdate(
            { _id: commentId },
            {$inc: { upvote: 1 }},
            { new: true }
          );
          console.log(a);
        } else {
          // if downvote increase downvote by 1
          const a = await Comments.findByIdAndUpdate(
            { _id: commentId },
            {$inc: { downvote: 1 }},
            { new: true }
            );
            console.log(a);
        }
        // send response to frontend
        res.send({ msg: "upvote and downvote updated", status: 200 });
        // handling errors
    } catch (error) {return res.send({msg:"failed to upvote or downvote",status:500})}
  };
  
  module.exports = {
    Usercomments,
    UserSubcomments,
    upvote_downvote_comment,
  };
  