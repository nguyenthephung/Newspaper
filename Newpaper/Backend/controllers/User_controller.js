const User = require('../models/User_model');
const bcrypt = require("bcrypt");
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
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("wrong username !");
      }
      const hashpassword = await bcrypt.compare(req.body.password, user.password);
      if (!hashpassword) {
        res.status(404).json("wrong password !");
      }
      if (user && hashpassword) {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  update: async (req, res) => {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
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

  getPreferences: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('preferences.categories');
      res.json(user.preferences);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updatePreferences: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { preferences: req.body.preferences }, { new: true });
      res.json(updatedUser.preferences);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = userController;
