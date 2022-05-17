const express = require('express');
const router = express.Router();
const controllerComment = require('../controllers/comment')

router.post("/addcomment", controllerComment.addComment);
router.post("/addcommenttocomment", controllerComment.addCommentToComment);
router.get('/getcommentsofpost/:id', controllerComment.getCommentsOfPost)
router.get('/getcommentsofcomment', controllerComment.getCommentsOfComment)




module.exports = router;