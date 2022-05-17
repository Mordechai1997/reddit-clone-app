const Comment = require('../models/comment');
const Post = require('../models/posts');

exports.addComment = (req, res) => {
    Comment.create(({
        idPost: req.body.id,
        postedBy: req.body.postedBy,
        title: req.body.comment,
        Ccomment: 0
    }))
        .then(() => {
            Post.increment('Ccomment', { by: 1, where: { postId: req.body.id } })
                .then(() => res.status(200))
                .catch(err => {
                    console.log(err);
                    res.status(500);
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
    res.status(200)
}
exports.addCommentToComment = (req, res) => {
    Comment.create(({
        idPost: req.body.id,
        postedBy: req.body.postedBy,
        title: req.body.comment,
        idParent: req.body.idComment,
        Ccomment: 0
    }))
        .then(() => {
            Comment.increment('Ccomment', { by: 1, where: { commentId: req.body.idComment } })
                .then(() => res.status(200))
                .catch(err => {
                    console.log(err);
                    res.status(500);
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });
    res.status(200)
}
exports.getCommentsOfPost = (req, res) => {
    Comment.findAll({
        where: {
            idPost: req.params.id,
            idParent: null
        }
    }).then((comments) => res.status(200).json({ comments }))

}
exports.getCommentsOfComment = (req, res) => {
    Comment.findAll({
        where: {
            idPost: req.query.idpost,
            idParent: req.query.idcomment
        }
    }).then((comments) => res.status(200).json({ comments }))
}
