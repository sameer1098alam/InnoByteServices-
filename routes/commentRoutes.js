const express = require('express');
const { createComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:postId/comments')
    .post(protect, createComment);

router.route('/comments/:commentId')
    .delete(protect, deleteComment);

module.exports = router;
