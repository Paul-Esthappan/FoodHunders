const express = require('express');
const router = express.Router();

const { getComments, addComment, editComment, deleteComment } = require('../Controller/commentController.js');
const { verifyToken } = require('../VerifyToken/verifyToken.js');

router.post('/',verifyToken,addComment )

router.put('/:id', verifyToken, editComment)
router.delete('/delete/:id',verifyToken,deleteComment)

router.get('/:videoId',getComments )

module.exports = router;