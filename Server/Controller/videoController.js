
const user = require('../models/userSchema');
const mongoose = require('mongoose');
const video = require('../models/videoSchema')
const ObjectId = mongoose.Types.ObjectId;




//CREATE A VIDEO
//@dec add a video
//@route POST /api/video/
//@acess  public
const addVideo = async (req, res, next) => {
  const newVideo = new video({ userId: req.user._id, ...req.body })
  console.log("new video", newVideo);
  

  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(newVideo._id)
  } catch (error) {
    next(error)
  }
}
//UPDATE A VIDEO
//@dec update video
//@route PUT /api/video:videoId
//@acess  public
const updateVideo = async (req, res, next) => {
  try {
    const editvideo = await video.findById(req.params.id);

    if (!editvideo) {
      return next(createError(404, "Video not found"));
    }

    if (req.user._id.toString() === editvideo.userId.toString()) {
      const editedVideo = await video.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(editedVideo);
    } else {
      return next(createError(403, "You can update your video only"));
    }
  } catch (error) {
    next(error);
  }
};


//DELETE A VIDEO
//@dec delete video
//@route DELETE /api/video:videoId
//@acess  public
const deleteVideo = async (req, res, next) => {
  try {
    const deletevideo = await video.findById(req.params.id);

    if (!deletevideo) {
      return next(createError(404, "Video not found"));
    }

    
    if (req.user._id.toString() === deletevideo.userId.toString()) {
      await video.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The video has been deleted" });
    } else {
      return next(createError(403, "You can delete only your video"));
    }
  } catch (error) {
    next(error);
  }
};

//Get A VIDEO
//@dec get a video
//@route GET /api/video/find:videoId
//@acess  public

const getVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const Video = await video.findOne({ _id: videoId }); 
    res.status(200).json(Video);
  } catch (error) {
    next(error);
  }
};

//Get A VIDEO of a user
//@dec get a video
//@route GET /api/video/findUserVideos
//@acess  user

const getUserVideo = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const Video = await video.find({userId})
    console.log("user req", req.user._id);
    console.log("video",Video);
    res.status(200).json(Video)
  }
  catch (error) {
    next(error);
  }
};



// Add view
// @desc Add view count
// @route PUT /api/video/view/:videoId
// @access public
const addView = async (req, res, next) => {
  try {
    // Use findByIdAndUpdate to increment the views by 1
    const updatedVideo = await video.findByIdAndUpdate(
      req.params.videoId, // Use req.params.videoId to get the videoId from the URL
      { $inc: { views: 1 } }, // Increment the views by 1
      { new: true } // Return the updated document
    );

    // Check if the video exists
    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "View count increased by 1", updatedVideo });
  } catch (error) {
    next(error);
  }
};



//Add random view
//@dec add view count
//@route PUT /api/video/random
//@acess  public
const randomVideo = async (req, res, next) => {
  try {
    const Videos = await video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(Videos);
  } catch (error) {
    next(error);
  }
};


//Add trending View
//@dec add view count
//@route PUT /api/video/trending
//@acess  public
const trendingVideo = async (req, res, next) => {
  try {
    const Videos = await video.find().sort({views:-1})
    res.status(200).json(Videos)
  }
  catch (error) {
    next(error);
  }
};


//Add Subscribed view
//@dec add view count
//@route GET /api/video/subscribed
//@acess  public
const subscribedVideo = async (req, res, next) => {
  try {
    const User = await user.findById(req.user._id);

    const subscribedChannels = await User.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async channelId => {
        return await video.find({ userId: channelId });
      })
    );

 res.status(200).json(list.flat().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  } catch (error) {
    next(error);
  }
};




//@dec search by tags
//@route GET /api/video/tags
//@acess  public
const videoTags = async (req, res, next) => {
  const tags = req.query.tags.split(",")
  try {
    const Videos = await video.find({tags:{$in:tags}}).limit(20)
    res.status(200).json(Videos)
    console.log(tags);
  }
  catch (error) {
    next(error);
  }
};



//@dec video Search
//@route get /api/video/searchVideo
//@acess  public
const searchVideo = async (req, res, next) => {
  const query = req.query.q;

  try {
    const Videos = await video.find({ title: { $regex: new RegExp(query, 'i') } });
    res.status(200).json(Videos);
  } catch (error) {
    next(error);
  }
};


//@dec savedvios
//@route get /api/video/savedvideos
//@acess  privite
const savedVideo = async (req, res, next) => {
  try {
    const userId = req.user._id; 
    console.log("userId",userId);
    const User = await user.findById(userId)
console.log("User",User);
    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    const videoIds = User.savedVideos || [];
console.log("videoIds",videoIds);
   const Videos = await video.find({ _id: { $in: videoIds } });
    console.log("videos",Videos);

    res.status(200).json(Videos);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { addVideo, savedVideo, getUserVideo, updateVideo,deleteVideo, getVideo,addView,getVideo,trendingVideo,randomVideo,subscribedVideo,videoTags,searchVideo };