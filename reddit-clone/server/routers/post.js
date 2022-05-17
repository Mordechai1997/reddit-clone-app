const express = require('express');
const router = express.Router();
const controllerSignin = require('../controllers/post')
var multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

router.post('/incrementvote',controllerSignin.incrementVote);
router.post('/decrementvote',controllerSignin.decrementVote);
router.post("/addPost", controllerSignin.addPost);
router.get('/getposts', controllerSignin.getPosts)
router.post('/uploadimage', upload.single('file'), function (req, res) {
    res.json({})
})




module.exports = router;