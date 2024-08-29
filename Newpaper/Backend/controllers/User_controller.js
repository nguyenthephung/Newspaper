const User = require('../models/User_model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens = [];

const userController = {
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "100d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Incorrect username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
       return res.status(404).json("Incorrect password");
      }
      if (user && validPassword) {
        //Generate access token
        const accessToken = userController.generateAccessToken(user);
        //Generate refresh token
        const refreshToken = userController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        //STORE REFRESH TOKEN IN COOKIE
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({ ...user._doc, accessToken, refreshToken });

      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = userController.generateAccessToken(user);
      const newRefreshToken = userController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  //LOG OUT
  logOut: async (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },

  getAll: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {

      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted', deletedUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },


  updateOrCreate: async (req, res) => {
    try {
      const { _id, password, ...userData } = req.body;
  
      if (password) {
        // Kiểm tra nếu mật khẩu đã được băm hay chưa
        const isHashed = password.startsWith('$2b$') || password.startsWith('$2a$');
  
        // Nếu mật khẩu chưa được băm, thực hiện băm
        if (!isHashed) {
          const saltRounds = 10; // Số vòng băm
          userData.password = await bcrypt.hash(password, saltRounds);
        } else {
          // Nếu mật khẩu đã được băm, giữ nguyên
          userData.password = password;
        }
      }
  
      let user;
      if (_id) {
        // Nếu có _id, tìm user để cập nhật
        user = await User.findById(_id);
        if (user) {
          // Cập nhật người dùng nếu tồn tại
          user = await User.findByIdAndUpdate(_id, userData, { new: true, runValidators: true });
          return res.json({ message: 'User updated', user });
        }
      }
      
      // Nếu không có _id hoặc không tìm thấy user, tạo mới
      user = new User(userData);
      await user.save();
      return res.status(201).json({ message: 'User created', user });
    } catch (err) {
      console.error("Error in updateOrCreate:", err);
      return res.status(400).json({ error: err.message });
    }
  }
  
  
  
  
};

module.exports = userController;
