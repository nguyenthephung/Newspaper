const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  socialAccounts: {
    facebook: { type: String },
    google: { type: String },
    phoneNumber: { type: String }
  },
  preferences: {
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    topics: [String]
  },
  notificationsEnabled: { type: Boolean, default: true },
  bookmarkedArticles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  adFreeSubscription: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
