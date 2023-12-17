const user = require("../models/userSchema");
const bcrypt = require('bcrypt');
const video = require("../models/videoSchema");

const jwt = require('jsonwebtoken')

   


//@dec view details with id
//@route GET /api/user/find:id
//@acess public

const getIdDetails = async (req, res, next) => {
    try {
       
        const findUser = await user.findById(req.params.id?.toString());
        if (req.params.id)
           
    res.status(202).json(findUser)
    } catch (error) {
        next(error)
    }
    
}
  ;
    
    
//@dec update details with id
//@route PUT /api/user/find:id
//@acess public
const putUpdate = async (req, res, next) => {
  try {
      const { username, email, password, phonenumber, dob, gender, country, image } = req.body;
      console.log(req.body);

    // Check if the user already exists
      const existingUser = await user.findById(req.params.id);
      console.log("prms id",req.params.id);

    if (!existingUser) {
      res.status(400);
      throw new Error("User not found");
    }

    // Update user details
  
  
    existingUser.username = username || existingUser.username;
    existingUser.phonenumber = phonenumber || existingUser.phonenumber;
    existingUser.dob = dob || existingUser.dob;
    existingUser.gender = gender || existingUser.gender;
    existingUser.country = country || existingUser.country;
    existingUser.image = image || existingUser.image;

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    await existingUser.save();

    const userWithoutPassword = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      phonenumber: existingUser.phonenumber,
      dob: existingUser.dob,
      gender: existingUser.gender,
      country: existingUser.country,
      image: existingUser.image,
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
      console.error("JWT secret key not found");
      return res.status(500).send("Internal Server Error");
    }

    jwt.sign(userWithoutPassword, JWT_SECRET_KEY, { expiresIn: 186400 }, (err, token) => {
      if (err) {
        console.error("Error signing JWT:", err);
        res.status(500).send("Internal Server Error");
      } else {
        // Send the token in the response
        res.status(200).json({ user: userWithoutPassword, token });
        console.log(userWithoutPassword);
      }
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(400).send("Error occurred: " + error.message);
  }
};

//@dec  delete profile pic
//@route  /api/user/findanddeleteprofilepic:id
//@acess  public



const deleteprofilepic = async (req, res, next) => {
try {
      const { username, email, password, phonenumber, dob, gender, country, image } = req.body;
      console.log(req.body);

    // Check if the user already exists
      const existingUser = await user.findById(req.params.id);
      console.log("prms id",req.params.id);

    if (!existingUser) {
      res.status(400);
      throw new Error("User not found");
    }

    // Update user details
    existingUser.username = username || existingUser.username;
    existingUser.phonenumber = phonenumber || existingUser.phonenumber;
    existingUser.dob = dob || existingUser.dob;
    existingUser.gender = gender || existingUser.gender;
    existingUser.country = country || existingUser.country;
   
    existingUser.image = undefined;

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
    }

    await existingUser.save();

    const userWithoutPassword = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      phonenumber: existingUser.phonenumber,
      dob: existingUser.dob,
      gender: existingUser.gender,
      country: existingUser.country,
      image: existingUser.image,
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!JWT_SECRET_KEY) {
      console.error("JWT secret key not found");
      return res.status(500).send("Internal Server Error");
    }

    jwt.sign(userWithoutPassword, JWT_SECRET_KEY, { expiresIn: 186400 }, (err, token) => {
      if (err) {
        console.error("Error signing JWT:", err);
        res.status(500).send("Internal Server Error");
      } else {
        // Send the token in the response
        res.status(200).json({ user: userWithoutPassword, token });
        console.log(userWithoutPassword);
      }
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(400).send("Error occurred: " + error.message);
  }
};
//@dec delete details with id
//@route  /api/user/find:id
//@acess  public

const deleteDetails = async(req, res, next) => {
try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

//SUBSCRIBE A USER
//@dec SUBSCRIBE
//@route /api/user/subscribe:id
//@acess  public


//add validation or duplate subcription

const subscribeUser = async (req, res, next) => {
    try {
        await user.findByIdAndUpdate(req.user._id, {
            $push: { subscribedUsers: req.params.id }
        });
        console.log("reqid in",req.user._id);
        await user.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
            
        });
        console.log("sucess");
     

        res.status(200).json("Subscription Successful");
    } catch (error) {
        next(error);
    }
};



//UNSUBSCRIBE A USER
//@dec delete details with id
//@route DELETE /api/user/unsubscribe:id
//@acess  public

const unsubscribeUser = async (req, res, next) => {
    try {
        await user.findByIdAndUpdate(req.user._id, {
            $pull: { subscribedUsers: req.params.id }
        });
console.log("reqid in",req.user._id);
        await user.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        console.log("paramid",req.params.id);

        res.status(200).json("Unsubscription Successful");
    } catch (error) {
        next(error);
    }
};



//LIKE A VIDEO
//@dec delete details with id
//@route DELETE /api/like:videoid
//@acess  public

const likeVideo = async(req, res, next) => {
    const id = req.user._id;
  const VideoId = req.params.videoid;
  console.log("vide id",VideoId);
try {
    await video.findByIdAndUpdate(VideoId, {
        $addToSet: { likes: id },
      $pull: { dislikes: id }
    },
    { new: true } )
    res.status(204).json({ message: `Like a vedio` })
    console.log("liked the t video");
} catch (error) {
    next(error)
}
}


//DISLIKE A VEDIO
//@dec delete details with id
//@route DELETE /api/like:videoid
//@acess  public

const disLikeVideo = async(req, res, next) => {
    const id = req.user._id;
    const VideoId = req.params.videoid;
try {
    await video.findByIdAndUpdate(VideoId, {
        $addToSet: { dislikes: id },
        $pull:{likes:id}
    })
    res.status(204).json({ message: `dislike a vedio` })
     console.log("disliked video");
} catch (error) {
    next(error)
}
}

//null like or dislike A VEDIO
//@dec  null like or dislike A VEDIO
//@route put /api/video/null:videoid
//@acess  privite

const nullLikeVideo = async(req, res, next) => {
    const id = req.user._id;
   const VideoId = req.params.videoid;
try {
    await video.findByIdAndUpdate(VideoId, {
        $pull: { dislikes: id },
        // $pull: { likes:id }
    })
    res.status(204).json({ message: `null a vedio` })
     console.log("null liked video");
} catch (error) {
    next(error)
}
}




//SAVE video 
//@dec save video to user
//@route PUT /api/user/save:videoid
//@acess  public


//add validation or duplate save

const saveVideo = async (req, res, next) => {
    
    try {
        await user.findByIdAndUpdate(req.user._id, {
            $push: { savedVideos: req.params.id }
        });
        console.log("user in", req.user._id);
        console.log("parms in",req.params.id);
        await video.findByIdAndUpdate(req.params.id, {
            $inc: { savedNo: 1 }
            
        });
        console.log("sucess");
     

        res.status(200).json("save Successful");
    } catch (error) {
        next(error);
    }
};


//UNSAVE video 
//@dec unsave video to user
//@route PUT /api/user/unsave:videoid
//@acess  public

const unsaveVideo = async (req, res, next) => {
    try {
        await user.findByIdAndUpdate(req.user._id, {
            $pull: { savedVideos: req.params.id }
        });
console.log("reqid in",req.user._id);
        await video.findByIdAndUpdate(req.params.id, {
            $inc: { savedNo: -1 }
        });
        console.log("paramid",req.params.id);

        res.status(200).json("Unsave Successful");
    } catch (error) {
        next(error);
    }
};


  
   
module.exports = {unsaveVideo, deleteprofilepic, saveVideo, getIdDetails, putUpdate, deleteDetails, subscribeUser, unsubscribeUser, likeVideo, disLikeVideo , nullLikeVideo}

