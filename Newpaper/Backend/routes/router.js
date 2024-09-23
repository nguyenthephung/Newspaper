const express = require('express');
const router = express.Router();
const userController = require('../controllers/User_controller');
const articleController = require('../controllers/Article_controller');
const categoryController = require('../controllers/Category_controller');
const commentController = require('../controllers/Comment_controller');
const tagController = require('../controllers/Tag_controller')
const ratingController = require('../controllers/Rating_controller')
const requestForm = require('../controllers/requestForm_controller');
const { getAllRequests, createRequest, updateRequestStatus, deleteRequest } = require('../controllers/requestForm_controller');  // Import controller
const { verifyToken,  verifyTokenAndUserAuthorization, verifyTokenAndAdmin,} = require("../middleware/userVerifyToken");
//Auth
router.post('/auth/register', userController.register);
router.post('/auth/logout', verifyToken, userController.logOut);
router.post('/auth/login', userController.login);

//REFRESH TOKEN
router.post('/auth/refresh', userController.requestRefreshToken);

// User routes
router.get('/user', userController.getAll);
router.post('/user/updateUser', userController.updateOrCreate);
router.delete('/user/:id',userController.delete)
router.post('/user/subscribe',userController.updateUserSubscription)
// Article routes
router.get('/article/getArticle', articleController.getAll);
router.post('/article/updateArticle',articleController.update);
router.delete('/article/:id',articleController.delete);
router.get('/article/getArticlePending', articleController.getAllPending);
router.post('/article/updateArticlePending/:id',articleController.updateArticleStatus);
router.post('/article/getBookMaked/:id',articleController.getBookMaked);

// Category routes
router.get('/category/getCategory', categoryController.getAll);
router.post('/category/updateCategory', categoryController.updateOrCreate);
router.delete('/category/:id', categoryController.delete);

// Tags
router.get('/tag/getTag', tagController.getAll);
router.post('/tag/updateTag', tagController.updateOrCreate);
router.delete('/tag/:id', tagController.delete);

// Comment routes
router.get('/comment/getComment', commentController.getAllComments);
router.post('/comment/updateComment', commentController.updateOrCreateComment);
router.delete('/comment/:id', commentController.deleteCommentById);

// Rating routes
 router.get('/rating/getRating', ratingController.getAllRatings);
 router.post('/rating/updateRating', ratingController.updateOrCreateRating);

//Email
router.post('/sendEmail',userController.publishArticle);

//Notification
router.post('/comment/markAsRead',commentController.markCommentsAsRead)
router.post('/article/markAsRead',articleController.markArticlesAsRead)
module.exports = router;

//Request Form
router.get('/requests', requestForm.getAllRequests);
router.post('/request', requestForm.createRequest);
router.put('/requests/:requestId', requestForm.updateRequestStatus);
router.get('/requests/:userId', requestForm.getRequestById);
