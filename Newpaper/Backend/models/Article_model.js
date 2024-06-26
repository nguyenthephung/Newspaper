const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    tags: [String],
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Article', articleSchema);
  