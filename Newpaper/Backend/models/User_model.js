const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  nickname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: [{ type: String }],
  subscribe: { type: Boolean, default: false },
  roll: { type: String, enum: ['guest', 'writer', 'admin'], default: 'guest' },
  bookmarkedArticles: [{ type: Schema.Types.ObjectId, ref: 'articles' }],
  avatar: { type: String,default:null  },// Thêm trường ảnh đại diện
  dateOfBirth: { type: Date }, // Thêm trường ngày sinh
  gender: { type: String, enum: ['male', 'female', 'other'] }, // Thêm trường giới tính
  phoneNumber: { type: String }, // Thêm trường số điện thoại cá nhân
  address: { type: String } // Thêm trường địa chỉ
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
