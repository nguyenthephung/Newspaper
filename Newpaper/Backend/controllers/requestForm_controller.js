const RequestForm = require('../models/requestForm_model');  // Import model RequestForm
const User = require('../models/User_model');
// Tạo yêu cầu mới
const createRequest = async (req, res) => {
  try {
    const { userId, username, email, message } = req.body;
    
    // Tạo yêu cầu mới
    const newRequest = new RequestForm({
      userId,
      username,
      email,
      message,
    });

    // Lưu yêu cầu
    await newRequest.save();
    res.status(201).json({ message: 'Yêu cầu của bạn đã được gửi thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi gửi yêu cầu.', error });
  }
};

// Lấy danh sách yêu cầu
const getAllRequests = async (req, res) => {
  try {
    const requests = await RequestForm.find();  // Truy vấn tất cả các yêu cầu
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách yêu cầu.', error });
  }
};

// Cập nhật trạng thái yêu cầu
const updateRequestStatus = async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
    try {
      // Tìm kiếm yêu cầu theo ID
      const request = await RequestForm.findById(requestId);
      if (!request) {
        return res.status(404).json({ message: 'Yêu cầu không tồn tại.' });
      }
  
      // Cập nhật trạng thái yêu cầu
      request.status = status;
      await request.save();
  
      // Nếu trạng thái yêu cầu là 'approved', cập nhật vai trò (roll) của người dùng thành 'writer'
      if (status === 'approved') {
        const user = await User.findById(request.userId); // Tìm người dùng bằng userId từ yêu cầu
        if (user) {
          user.roll = 'writer'; // Cập nhật roll thành writer
          await user.save();
        }
      }
  
      res.status(200).json({ message: 'Trạng thái yêu cầu đã được cập nhật.' });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật yêu cầu.', error });
    }
  };
  

const getRequestById = async (req, res) => {
    const { userId } = req.params;
    try {
      const requests = await RequestForm.find({ userId });  // Tìm kiếm yêu cầu theo userId
      if (requests.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy yêu cầu nào cho userId này.' });
      }
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: 'Có lỗi xảy ra khi lấy yêu cầu.', error });
    }
  };
module.exports = {
  createRequest,
  getAllRequests,
  updateRequestStatus,
  getRequestById 
};  // Export các hàm controller
