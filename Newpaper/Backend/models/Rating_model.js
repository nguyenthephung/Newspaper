const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
    article: { type: Schema.Types.ObjectId, ref: 'articles', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    ratingCount: { type: Number, default: 0 }, 
  }, { timestamps: true });
  
  module.exports = mongoose.model('ratings', ratingSchema);
  