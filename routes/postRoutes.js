const express = require('express');
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.route('/:id')
    .get(getPostById)
    .put(protect, updatePost)
    .delete(protect, admin, deletePost);

module.exports = router;
