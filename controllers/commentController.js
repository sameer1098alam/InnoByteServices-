const Comment = require('../models/Comment');
const Post = require('../models/Post');

const createComment = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (post) {
        const comment = new Comment({
            content,
            user: req.user._id,
            post: postId,
        });

        const createdComment = await comment.save();
        post.comments.push(createdComment._id);
        await post.save();

        res.status(201).json(createdComment);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

const deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.commentId);

    if (comment) {
        await comment.remove();
        res.json({ message: 'Comment removed' });
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
};

module.exports = { createComment, deleteComment };
