const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDatabase = require("./utils/db");
const router = require("./routes/router");
const uploadRoutes = require('./routes/upload');
const path = require('path');
dotenv.config();

const app = express();

// Kết nối đến cơ sở dữ liệu
connectToDatabase.connectToDatabase();

// Cấu hình CORS
app.use(cors());

// Cấu hình middleware để xử lý dữ liệu JSON với kích thước tối đa 50MB
app.use(express.json({ limit: '50mb' }));  // Thay đổi kích thước tối đa theo nhu cầu của bạn

// Cấu hình middleware để phân tích cookies
app.use(cookieParser());

// Cấu hình router
app.use("/v1", router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', uploadRoutes);
// Khởi động server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
