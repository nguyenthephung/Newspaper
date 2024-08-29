const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    article: { type: Schema.Types.ObjectId, ref: 'articles', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  }, { timestamps: true });
  
  module.exports = mongoose.model('comments', commentSchema);
  