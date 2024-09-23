const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  article: { type: Schema.Types.ObjectId, ref: 'articles', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  parentCommentId: { type: Schema.Types.ObjectId, ref: 'comments', default: null }, // Dùng để liên kết với bình luận cha
}, { timestamps: true });

module.exports = mongoose.model('comments', commentSchema);
