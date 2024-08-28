const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  }, { timestamps: true });
  
  module.exports = mongoose.model('comments', commentSchema);
  