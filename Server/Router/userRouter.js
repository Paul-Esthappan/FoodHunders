const express = require('express');
const { getIdDetails,deleteprofilepic,saveVideo,unsaveVideo, putUpdate, deleteDetails,subscribeUser, unsubscribeUser, likeVideo, disLikeVideo, nullLikeVideo  } = require('../Controller/userController.js');
const { verifyToken, verifyTokenandAuthorization } = require('../VerifyToken/verifyToken.js');
const router = express.Router();

//GET USER
//UPDATE USER
//DELETE USER
router.route('/find/:id').get(getIdDetails).put(verifyToken, putUpdate).delete(verifyToken,deleteDetails)
//delete profilepic
router.route('/findanddeleteprofilepic/:id').put(verifyToken,deleteprofilepic)
//SUBSCRIBE A USER
router.route('/subscribe/:id').put(verifyToken, subscribeUser)

//UNSUBSCRIBE A USER
router.route('/unsubscribe/:id').put(verifyToken,unsubscribeUser)

//LIKE A VIDEO
router.route('/like/:videoid').put(verifyToken, likeVideo)

//DISLIKE A VEDIO
router.route('/dislike/:videoid').put(verifyToken, disLikeVideo)
//NULLLIKE A VEDIO
router.route('/nullLikeVideo/:videoid').put(verifyToken, nullLikeVideo)

//savedVideo
router.route('/save/:id').put(verifyToken, saveVideo)

//unsave video
router.route('/unsave/:id').put(verifyToken, unsaveVideo)



//RECOMMEND A SPOT

//NOT RECOMMEND A SPOT


//WORTH SPOT

//NOT WORTH SPOT

//TASTE SPOT

//NO TASTE SPOT

//GOOD SERVICE

//BAD SERVICE




module.exports = router