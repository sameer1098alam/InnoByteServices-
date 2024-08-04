const Post = require('../models/Post');

const getPosts = async (req, res) => {
    const posts = await Post.find().populate('user', 'username');
    res.json(posts);
};

const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user', 'username').populate('comments');
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

const createPost = async (req, res) => {
    const { title, content } = req.body;

    const post = new Post({
        title,
        content,
        user: req.user._id,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
};

const updatePost = async (req, res) => {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (post) {
        post.title = title;
        post.content = content;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        await post.remove();
        res.json({ message: 'Post removed' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
