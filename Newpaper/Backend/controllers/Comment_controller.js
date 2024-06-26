const Comment = require('../models/Comment_model');

const commentController = {
  add: async (req, res) => {
    try {
      const newComment = new Comment({
        ...req.body,
        article: req.params.articleId,
        user: req.user._id
      });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  getByArticle: async (req, res) => {
    try {
      const comments = await Comment.find({ article: req.params.articleId }).populate('user').populate('parentComment');
      res.json(comments);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      res.json({ message: 'Comment deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = commentController;
