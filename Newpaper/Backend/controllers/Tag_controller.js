const Tag = require('../models/Tag_model');

const tagController = {

  getAll: async (req, res) => {
    try {
      const tags = await Tag.find();
      res.json(tags);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateOrCreate: async (req, res) => {
    try {
      const { _id, name, ...tagData } = req.body;
      console.log(req.body);

      // Kiểm tra xem name đã tồn tại hay chưa
      const existingTag = await Tag.findOne({ name });
      if (existingTag && existingTag._id.toString() !== _id) {
        return res.status(400).json({ error: 'Tag name already exists' });
      }

      let tag;
      if (_id) {
        tag = await Tag.findById(_id);

        if (tag) {
          // Cập nhật tag nếu tồn tại
          tag = await Tag.findByIdAndUpdate(_id, { name, ...tagData }, { new: true, runValidators: true });
          return res.json({ message: 'Tag updated', tag });
        }
      }

      // Tạo mới tag nếu không có _id hoặc không tìm thấy trong DB
      tag = new Tag({ name, ...tagData });
      await tag.save();
      res.status(201).json({ message: 'Tag created', tag });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Tag.findByIdAndDelete(req.params.id);
      res.json({ message: 'Tag deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = tagController;
