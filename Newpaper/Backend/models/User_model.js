const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  socialAccounts: {
    facebook: { type: String },
    google: { type: String },
    phoneNumber: { type: String }
  },
  preferences: {
    categories: [
      {
        category: { type: Schema.Types.ObjectId, ref: 'categories' },
        tags: [String]
      }
    ]
  },
  Subscribe: { type: Boolean, default :false },
  notificationsEnabled: { type: Boolean, default: true },
  bookmarkedArticles: [{ type: Schema.Types.ObjectId, ref: 'articles' }],
  adFreeSubscription: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
