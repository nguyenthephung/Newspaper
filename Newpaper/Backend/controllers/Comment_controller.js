// const Comment = require('../models/Comment_model')
// const mongoose = require('mongoose');
// const User = require('../models/User_model');
// const Article = require('../models/Article_model');
// // Lấy tất cả các comment
// const getAllComments = async (req, res) => {
//   try {
//     // Tìm tất cả các comment
//     const comments = await Comment.find();

//     // Lấy tất cả các userId và articleId từ các comment
//     const userIds = comments.map(comment => comment.user);
//     const articleIds = comments.map(comment => comment.article);

//     // Truy vấn để lấy thông tin các user và article tương ứng
//     const users = await User.find({ _id: { $in: userIds } }, 'username');
//     const articles = await Article.find({ _id: { $in: articleIds } }, '_id');

//     // Tạo một map để dễ dàng truy cập thông tin
//     const userMap = users.reduce((acc, user) => {
//       acc[user._id] = user.username;
//       return acc;
//     }, {});

//     const articleMap = articles.reduce((acc, article) => {
//       acc[article._id] = article._id;
//       return acc;
//     }, {});

//     // Định dạng dữ liệu trả về
//     const formattedComments = comments.map(comment => ({
//       _id: comment._id,
//       userId: comment.user,          // Lấy ObjectId của user
//       articleId: comment.article,    // Lấy ObjectId của article
//       content: comment.content,      // Lấy nội dung comment
//       user: userMap[comment.user],   // Lấy tên user từ map
//       isRead: comment.isRead,        // Thêm trạng thái đã đọc
//       createdAt: comment.createdAt   // Lấy thời gian tạo comment
//     }));

//     res.status(200).json(formattedComments);
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi khi lấy comments', error });
//   }
// };



// const updateOrCreateComment = async (req, res) => {
//   try {
//     const { _id, articleId, userId, content } = req.body;

//     // Kiểm tra xem articleId và userId có phải là ObjectId hợp lệ không
//     if (!mongoose.Types.ObjectId.isValid(articleId) || !mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: 'Invalid ObjectId for article or user.' });
//     }

//     let comment;
//     if (_id) {
//       // Cập nhật comment nếu có _id
//       comment = await Comment.findByIdAndUpdate(
//         _id,
//         { content, user: userId, article: articleId },
//         { new: true, runValidators: true }
//       );
//     }

//     if (!comment) {
//       // Tạo mới comment nếu không tìm thấy comment với _id
//       comment = new Comment({ content, user: userId, article: articleId });
//       await comment.save();
//     }

//     res.status(200).json(comment);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Xóa comment theo id
// const deleteCommentById = async (req, res) => {
//   const { id } = req.params; // Lấy id từ params

//   try {
//     const comment = await Comment.findByIdAndDelete(id);
//     if (!comment) {
//       return res.status(404).json({ message: 'Không tìm thấy comment với id này' });
//     }
//     res.status(200).json({ message: 'Xóa comment thành công' });
//   } catch (error) {
//     res.status(500).json({ message: 'Lỗi khi xóa comment', error });
//   }
// };

// const markCommentsAsRead = async (req, res) => {
//   try {
//     const { commentIds } = req.body; // Một mảng chứa các ID của bình luận cần cập nhật

//     // Kiểm tra xem commentIds có phải là mảng hợp lệ không
//     if (!Array.isArray(commentIds) || commentIds.length === 0) {
//       return res.status(400).json({ message: 'Invalid comment IDs.' });
//     }

//     // Kiểm tra tất cả commentIds có hợp lệ không
//     const invalidIds = commentIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
//     if (invalidIds.length > 0) {
//       return res.status(400).json({ message: 'Invalid ObjectId(s) in comment IDs.' });
//     }

//     // Cập nhật trạng thái isRead của các bình luận
//     const result = await Comment.updateMany(
//       { _id: { $in: commentIds } },
//       { $set: { isRead: true } }
//     );

//     res.status(200).json({ message: 'Comments updated successfully.', result });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };




// module.exports = {
//   getAllComments,
//   updateOrCreateComment,
//   deleteCommentById,
//   updateOrCreateComment,
//   markCommentsAsRead,
// };
const Comment = require('../models/Comment_model')
const mongoose = require('mongoose');
const User = require('../models/User_model');
const Article = require('../models/Article_model');

const getAllComments = async (req, res) => {
  try {
    // Tìm tất cả các comment (bao gồm cả bình luận và reply)
    const comments = await Comment.find();

    // Lấy tất cả các userId và articleId từ các comment
    const userIds = comments.map(comment => comment.user);
    const articleIds = comments.map(comment => comment.article);

    // Truy vấn để lấy thông tin các user và article tương ứng
    const users = await User.find({ _id: { $in: userIds } }, 'username avatar'); // Thêm avatar vào truy vấn
    const articles = await Article.find({ _id: { $in: articleIds } }, '_id');

    // Tạo một map để dễ dàng truy cập thông tin
    const userMap = users.reduce((acc, user) => {
      acc[user._id] = { username: user.username, avatar: user.avatar }; // Lưu cả username và avatar
      return acc;
    }, {});

    const articleMap = articles.reduce((acc, article) => {
      acc[article._id] = article._id;
      return acc;
    }, {});

    // Định dạng dữ liệu trả về
    const formattedComments = comments.map(comment => ({
      _id: comment._id,
      userId: comment.user,          // Lấy ObjectId của user
      articleId: comment.article,    // Lấy ObjectId của article
      content: comment.content,      // Lấy nội dung comment
      parentCommentId: comment.parentCommentId, // Lấy ID của comment cha (nếu có)
      user: {
        username: userMap[comment.user]?.username, // Lấy tên user từ map
        avatar: userMap[comment.user]?.avatar      // Lấy avatar từ map
      },
      isRead: comment.isRead,        // Thêm trạng thái đã đọc
      createdAt: comment.createdAt   // Lấy thời gian tạo comment
    }));

    // Tổ chức phản hồi (reply) vào trong bình luận gốc
    const nestedComments = formattedComments.filter(c => !c.parentCommentId).map(parent => ({
      ...parent,
      replies: formattedComments.filter(c => String(c.parentCommentId) === String(parent._id))
    }));

    res.status(200).json(nestedComments);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy comments', error });
  }
};

const updateOrCreateComment = async (req, res) => {
  try {
    const { _id, articleId, userId, content, parentCommentId } = req.body;

    // Kiểm tra xem articleId và userId có phải là ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(articleId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid ObjectId for article or user.' });
    }

    let comment;
    if (_id) {
      // Cập nhật comment nếu có _id
      comment = await Comment.findByIdAndUpdate(
        _id,
        { content, user: userId, article: articleId, parentCommentId: parentCommentId || null },
        { new: true, runValidators: true }
      );
    }

    if (!comment) {
      // Tạo mới comment nếu không tìm thấy comment với _id
      comment = new Comment({ content, user: userId, article: articleId, parentCommentId: parentCommentId || null });
      await comment.save();
    }

    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const deleteCommentById = async (req, res) => {
  const { id } = req.params; // Lấy id từ params

  try {
    // Xóa bình luận gốc
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Không tìm thấy comment với id này' });
    }

    // Xóa tất cả các phản hồi của bình luận
    await Comment.deleteMany({ parentCommentId: id });

    res.status(200).json({ message: 'Xóa comment và phản hồi thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa comment', error });
  }
};
const markCommentsAsRead = async (req, res) => {
  try {
    const { commentIds } = req.body; // Một mảng chứa các ID của bình luận cần cập nhật

    // Kiểm tra xem commentIds có phải là mảng hợp lệ không
    if (!Array.isArray(commentIds) || commentIds.length === 0) {
      return res.status(400).json({ message: 'Invalid comment IDs.' });
    }

    // Kiểm tra tất cả commentIds có hợp lệ không
    const invalidIds = commentIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({ message: 'Invalid ObjectId(s) in comment IDs.' });
    }

    // Cập nhật trạng thái isRead của các bình luận
    const result = await Comment.updateMany(
      { _id: { $in: commentIds } },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: 'Comments updated successfully.', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllComments,
  updateOrCreateComment,
  deleteCommentById,
  updateOrCreateComment,
  markCommentsAsRead,
};