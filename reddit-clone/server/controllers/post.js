const Post = require('../models/posts');


exports.getPosts = (req, res) => {
    Post.findAll({

    }).then((posts) => res.status(200).json({ posts }))
}
exports.uploadImage = (req, res) => {
    res.status(200);
}
exports.addPost = (req, res) => {
    Post.create(({
        postedBy: req.body.name,
        title: req.body.title,
        link: req.body.link,
        image: req.body.fileName,
        Cvote: 0,
        Ccomment: 0

    }))
        .then(() => {
            res.status(200);
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
    res.status(200)
}

exports.incrementVote = (req, res) => {
    Post.increment('Cvote', { by: 1, where: { postId: req.body.id } })
}
exports.decrementVote = (req, res) => {
    Post.decrement('Cvote', { by: 1, where: { postId: req.body.id } })
}