const comment = require('../models/commentSchema');

const video = require('../models/videoSchema');


//@dec add a comment
//@route POST /api/comments
//@acess  public
const addComment = async (req, res, next) => {
  const newComment = new comment({
    ...req.body,
    userId: req.user._id,
  });


  try {
    const savedComment = await newComment.save();
    
    res.status(201).json({
      message: "Comment added successfully",
      comment: savedComment,
    });
  } catch (error) {
    next(error);
  }
};
//@dec edit comment
//@route PUUT /api/comments/:id
//@acess  public

const editComment = async (req, res, next) => {
  console.log("params", req.params);
  console.log("req.commentbody",req.body);
  try {
    const editedcomment = await comment.findById(req.params.id);
    
    

    if (!editedcomment) {
      return next(createError(404, "Comment not found"));
    }
    console.log("comment body",req.body);

    if (req.user._id.toString() === editedcomment.userId.toString()) {
      const updatedComment = await comment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedComment);
    } else {
      return next(createError(403, "You can edit your comment only"));
    }
  } catch (error) {
    next(error);
  }
};

//@dec delete comment
//@route POST /api/comments/:id
//@acess  public
const deleteComment = async (req, res, next) => {
  try {
    const deletecomment = await comment.findById(req.params.id);
    const Video = await video.findById(deletecomment.userId);

    console.log("delete body", deletecomment);
    console.log("delete id", Video);


    if (!deletecomment) {
      return next(createError(404, "Comment not found"));
    }

    if (req.user._id.toString() === deletecomment.userId.toString() || req.user._id.toString() === Video.userId.toString()) {
      await comment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The comment has been deleted" });
    } else {
      return next(createError(403, "You can delete only your comment"));
    }
  } catch (error) {
    next(error);
  }
};


//@dec get comment
//@route POST /api/comments/:videoId
//@acess  public

const getComments = async (req, res, next) => {
  try {
    const videoId = req.params.videoId;
    const comments = await comment.find({ videoId });
if (comment) {
  res.status(200).json(comments);
} else {
  res.status(400).json("nocomments")
}
    
  } catch (error) {
    next(error);
  }
};



module.exports = { addComment, editComment, deleteComment, getComments };