const express = require('express');
const router = express.Router();
const userController = require('../controllers/User_controller');
const articleController = require('../controllers/Article_controller');
const categoryController = require('../controllers/Category_controller');
const commentController = require('../controllers/Comment_controller');
const notificationController = require('../controllers/Notification_controller');
const subscriptionController = require('../controllers/Subscription_controller');

// User routes
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.put('/users/:id', userController.update);
router.get('/users/:id/preferences', userController.getPreferences);
router.put('/users/:id/preferences', userController.updatePreferences);

// Article routes
router.post('/articles', articleController.create);
router.get('/articles', articleController.getAll);
router.get('/articles/:id', articleController.getById);
router.put('/articles/:id', articleController.update);
router.delete('/articles/:id', articleController.delete);
router.get('/articles/search', articleController.search);

// Category routes
router.post('/categories', categoryController.create);
router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getById);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

// Comment routes
router.post('/articles/:articleId/comments', commentController.add);
router.get('/articles/:articleId/comments', commentController.getByArticle);
router.delete('/comments/:id', commentController.delete);

// Notification routes
router.get('/notifications', notificationController.getAllByUser);
router.put('/notifications/:id', notificationController.markAsRead);

// Subscription routes
router.post('/subscriptions', subscriptionController.create);
router.get('/subscriptions', subscriptionController.getByUser);
router.delete('/subscriptions', subscriptionController.cancel);

module.exports = router;
