const Tag = require('../models/Tag_model');
const Category = require('../models/Category_model')
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
        const { _id, name, description, category } = req.body;

        // Kiểm tra tag trùng tên
        const existingTag = await Tag.findOne({ name });
        if (existingTag && (! _id || existingTag._id.toString() !== _id)) {
            return res.status(400).json({ error: 'Tag with this name already exists' });
        }

        let tag;
        if (_id) {
            // Nếu có ID, tìm kiếm tag trong cơ sở dữ liệu
            tag = await Tag.findById(_id);
        }

        if (tag) {
            // Nếu tìm thấy tag, cập nhật nó
            tag.name = name;
            tag.description = description;
            tag.category = category;
            await tag.save();
        } else {
            // Nếu không tìm thấy tag hoặc không có ID, tạo tag mới
            tag = new Tag({ name, description, category });
            await tag.save();
        }

        // Cập nhật trường tags trong Category
        if (category) {
            const categoryDoc = await Category.findOne({ name: category });

            if (categoryDoc) {
                // Đảm bảo không có tag trùng trong category
                if (!categoryDoc.tags.includes(tag._id.toString())) {
                    categoryDoc.tags.push(tag._id);
                    await categoryDoc.save();
                }
            } else {
                // Nếu không tìm thấy category, có thể tạo mới hoặc xử lý tùy ý
                const newCategory = new Category({
                    name: category,
                    tags: [tag._id]
                });
                await newCategory.save();
            }
        }

        res.json(tag);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
},


  delete: async (req, res) => {
    try {
      const tagId = req.params.id;

      // Xóa tag
      await Tag.findByIdAndDelete(tagId);

      // Loại bỏ ObjectId của tag đó khỏi các category liên quan
      await Category.updateMany(
        { tags: tagId },
        { $pull: { tags: tagId } }
      );

      res.json({ message: 'Tag deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = tagController;
