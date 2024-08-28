const Category = require('../models/Category_model');
const Tag = require('../models/Tag_model');

const categoryController = {

  getAll: async (req, res) => {
    try {
      // Lấy tất cả category và populate tag để lấy name thay vì ObjectId
      const categories = await Category.find().populate({
        path: 'tags',
        select: 'name -_id' // Chỉ chọn name và loại bỏ _id
      });

      // Chuyển đổi tags từ array ObjectId thành array string chứa tên
      const categoriesWithTagNames = categories.map(category => ({
        ...category._doc,
        tags: category.tags.map(tag => tag.name)
      }));

      res.json(categoriesWithTagNames);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateOrCreate: async (req, res) => {
    try {
      const { _id, name, ...categoryData } = req.body;
      console.log(req.body);
      
      // Kiểm tra xem name đã tồn tại hay chưa
      const existingCategory = await Category.findOne({ name });
      if (existingCategory && existingCategory._id.toString() !== _id) {
        return res.status(400).json({ error: 'Category name already exists' });
      }
  
      let category;
      if (_id) {
        category = await Category.findById(_id);
  
        if (category) {
          // Cập nhật danh mục nếu tồn tại
          category = await Category.findByIdAndUpdate(_id, { name, ...categoryData }, { new: true, runValidators: true });
          return res.json({ message: 'Category updated', category });
        }
      }
  
      // Tạo mới danh mục nếu không có _id hoặc không tìm thấy trong DB
      category = new Category({ name, ...categoryData });
      await category.save();
      res.status(201).json({ message: 'Category created', category });
  
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      // Lấy danh mục cần xóa
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Xóa danh mục khỏi tất cả các tag liên quan
      await Tag.updateMany(
        { tags: category._id },
        { $pull: { tags: category._id } }
      );

      // Xóa danh mục khỏi database
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: 'Category deleted and removed from tags' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = categoryController;
