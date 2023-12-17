const express = require('express');
const { verifyTokenandAuthorization, verifyToken } = require('../VerifyToken/verifyToken');
const { addVideo,getUserVideo,savedVideo, updateVideo, deleteVideo, getVideo, addView, trendingVideo, randomVideo, subscribedVideo, videoTags, searchVideo } = require('../Controller/videoController');
const router = express.Router();

//CREATE A VIDEO    

router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo)
router.delete('/:id',verifyToken, deleteVideo);
router.get('/find/:id', getVideo)
router.get('/findUserVideos',verifyToken, getUserVideo)
router.put('/view/:videoId',addView)
router.get('/trending',trendingVideo)
router.get('/random', randomVideo)
router.get('/tags', videoTags)
router.get('/search', searchVideo)
router.get('/subscribed', verifyToken, subscribedVideo)
router.get('/savedvideos', verifyToken, savedVideo)

module.exports = router;
