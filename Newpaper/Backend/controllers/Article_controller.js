const Article = require('../models/Article_model');
const Category = require('../models/Category_model');
const Tag = require('../models/Tag_model');
const User = require('../models/User_model');
const articleController = {

 
    getAll: async (req, res) => {
      try {
        // Tìm tất cả các bài viết có trạng thái 'approved'
        const articles = await Article.find({ status: 'approved' });
  
        // Lấy tất cả các category ID từ các bài viết
        const categoryIds = [...new Set(articles.map(article => article.category))];
        // Lấy tất cả các tag ID từ các bài viết
        const tagIds = [...new Set(articles.flatMap(article => article.tags))];
  
        // Tìm các category và tag theo ID
        const categories = await Category.find({ _id: { $in: categoryIds } });
        const tags = await Tag.find({ _id: { $in: tagIds } });
  
        // Tạo một map để tra cứu nhanh các category và tag theo ID
        const categoryMap = new Map(categories.map(cat => [cat._id.toString(), cat.name]));
        const tagMap = new Map(tags.map(tag => [tag._id.toString(), tag.name]));
  
        // Thay thế ID bằng tên trong danh sách bài viết
        const articlesWithNames = articles.map(article => ({
          ...article._doc,
          category: categoryMap.get(article.category.toString()), // Thay thế ID bằng tên category
          tags: article.tags.map(tagId => tagMap.get(tagId.toString())) // Thay thế ID bằng tên tag
        }));
  
        res.json(articlesWithNames);
      } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
      }
    },
    getAllPending: async (req, res) => {
      try {
        // Tìm tất cả các bài viết có trạng thái 'approved'
        const articles = await Article.find();
  
        // Lấy tất cả các category ID từ các bài viết
        const categoryIds = [...new Set(articles.map(article => article.category))];
        // Lấy tất cả các tag ID từ các bài viết
        const tagIds = [...new Set(articles.flatMap(article => article.tags))];
  
        // Tìm các category và tag theo ID
        const categories = await Category.find({ _id: { $in: categoryIds } });
        const tags = await Tag.find({ _id: { $in: tagIds } });
  
        // Tạo một map để tra cứu nhanh các category và tag theo ID
        const categoryMap = new Map(categories.map(cat => [cat._id.toString(), cat.name]));
        const tagMap = new Map(tags.map(tag => [tag._id.toString(), tag.name]));
  
        // Thay thế ID bằng tên trong danh sách bài viết
        const articlesWithNames = articles.map(article => ({
          ...article._doc,
          category: categoryMap.get(article.category.toString()), // Thay thế ID bằng tên category
          tags: article.tags.map(tagId => tagMap.get(tagId.toString())) // Thay thế ID bằng tên tag
        }));
  
        res.json(articlesWithNames);
      } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
      } 
    },
   updateArticleStatus :async (req, res) => {
      try {
        const { id } = req.params;  // Lấy ID bài viết từ params
        const { status } = req.body; // Lấy trạng thái mới từ body
    
        // Kiểm tra nếu thiếu thông tin cần thiết
        if (!status) {
          return res.status(400).json({ message: 'Thiếu thông tin status' });
        }
    
        // Tìm bài viết theo ID
        const article = await Article.findById(id);
    
        if (!article) {
          return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }
    
        // Cập nhật trạng thái của bài viết
        article.status = status;
        await article.save();
    
        return res.status(200).json({
          message: 'Cập nhật trạng thái bài viết thành công',
          article
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái bài viết' });
      }
    },
    update: async (req, res) => {
      try {
        const { _id, category: categoryName, tags: tagNames, userId, ...articleData } = req.body;
        
        // Tìm Category và Tags theo tên
        const category = categoryName ? await Category.findOne({ name: categoryName }) : null;
        const tags = tagNames ? await Tag.find({ name: { $in: tagNames } }) : [];
  
        // Chuyển đổi Category và Tags thành ObjectId
        if (category) {
          articleData.category = category._id;
        }
        articleData.tags = tags.map(tag => tag._id);
  
        let article;
        if (_id) {
          // Nếu có ID trong request body, tìm và cập nhật article
          article = await Article.findById(_id);
          if (article) {
            Object.assign(article, articleData);
          } else {
            return res.status(404).json({ error: 'Article not found' });
          }
        } else {
          // Nếu không có ID, tạo mới article
          article = new Article(articleData);
        }
  
        // Lưu hoặc cập nhật article
        await article.save();
  
        // Cập nhật bookmarkedArticles cho User nếu có userId
        if (userId) {
          const user = await User.findById(userId);
          if (user) {
            // Kiểm tra xem bài viết đã được bookmark chưa
            if (!user.bookmarkedArticles.includes(article._id)) {
              user.bookmarkedArticles.push(article._id);
              await user.save();
            }
          } else {
            return res.status(404).json({ error: 'User not found' });
          }
        }
  
        res.json(article);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    },
  
    delete: async (req, res) => {
      try {
        const article = await Article.findById(req.params.id);
  
        if (!article) {
          return res.status(404).json({ message: 'Article not found' });
        }
  
        if (!req.user.isAdmin && String(article.author) !== String(req.user.id)) {
          return res.status(403).json({ message: 'You are not authorized to delete this article' });
        }
  
        if (article.status !== 'approved') {
          return res.status(403).json({ message: 'Article cannot be deleted unless it is approved' });
        }
  
        // Xóa bài viết
        await Article.findByIdAndDelete(req.params.id);
  
        // Xóa bài viết khỏi bookmarkedArticles của tất cả người dùng
        await User.updateMany(
          { bookmarkedArticles: article._id },
          { $pull: { bookmarkedArticles: article._id } }
        );
  
        res.json({ message: 'Article deleted and removed from all user bookmarks' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    },
   getBookMaked : async (req, res) => {
      const userId = req.params.id;
      try {
        const user = await User.findById(userId).populate('bookmarkedArticles');
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });

        }
    
        res.status(200).json(user.bookmarkedArticles);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    }
}

module.exports = articleController;
