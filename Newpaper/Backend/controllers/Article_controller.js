const Article = require('../models/Article_model');

const articleController = {
  create: async (req, res) => {
    try {
      let status = 'pending'; 
      const newArticle = new Article({
        ...req.body,
        author: req.user._id,
        status: status
      });
      await newArticle.save();
      res.status(201).json(newArticle);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const articles = await Article.find().populate('categories');
      res.json(articles);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id).populate('categories');
      res.json(article);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);

      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
      if (article.status !== 'approved') {
        return res.status(403).json({ message: 'Article cannot be updated unless it is approved' });
      }

      const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedArticle);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);

      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      if (article.status !== 'approved') {
        return res.status(403).json({ message: 'Article cannot be deleted unless it is approved' });
      }

      await Article.findByIdAndDelete(req.params.id);
      res.json({ message: 'Article deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  search: async (req, res) => {
    try {
      const { query } = req.query;
      const articles = await Article.find({ $text: { $search: query } });
      res.json(articles);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = articleController;
