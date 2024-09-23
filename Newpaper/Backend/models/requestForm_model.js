const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestFormSchema = new Schema({
  userId: { type: String, required: true },  // Lưu trực tiếp ID người dùng
  username: { type: String, required: true },  // Lưu username cho tiện hiển thị
  email: { type: String, required: true },  // Lưu email
  message: { type: String, required: true },  // Nội dung yêu cầu
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },  // Trạng thái của yêu cầu
}, { timestamps: true });

module.exports = mongoose.model('RequestForm', requestFormSchema);  // Export model với tên RequestForm
