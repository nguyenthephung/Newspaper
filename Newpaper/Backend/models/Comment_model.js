const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Comment', commentSchema);
  