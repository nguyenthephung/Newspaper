const Rating = require('../models/Rating_model');
const User = require('../models/User_model');
const Article = require('../models/Article_model');
// Hàm lấy tất cả ratings chỉ trả về các trường userId, articleId, và ratingCount
const getAllRatings = async (req, res) => {
    try {
        // Lấy tất cả các rating với các trường user, article, và ratingCount
        const ratings = await Rating.find({}, 'user article ratingCount');

        // Lấy tất cả các userId và articleId từ các ratings
        const userIds = ratings.map(rating => rating.user);
        const articleIds = ratings.map(rating => rating.article);

        // Truy vấn để lấy thông tin các user và article tương ứng
        const users = await User.find({ _id: { $in: userIds } }, '_id');
        const articles = await Article.find({ _id: { $in: articleIds } }, '_id');

        // Tạo một map để dễ dàng truy cập thông tin
        const userMap = users.reduce((acc, user) => {
            acc[user._id] = user._id;
            return acc;
        }, {});

        const articleMap = articles.reduce((acc, article) => {
            acc[article._id] = article._id;
            return acc;
        }, {});

        // Chuyển đổi kết quả để chỉ bao gồm các trường userId, articleId, và ratingCount
        const result = ratings.map(rating => ({
            userId: userMap[rating.user],         // Lấy ObjectId của user từ map
            articleId: articleMap[rating.article], // Lấy ObjectId của article từ map
            ratingCount: rating.ratingCount,      // Lấy số lượng rating
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve ratings' });
    }
};

// Hàm cập nhật hoặc tạo mới rating với req body chỉ chứa các trường userId, articleId, và ratingCount
const updateOrCreateRating = async (req, res) => {
    const { _id, userId, articleId, ratingCount } = req.body;

    try {
        let rating;

        // Tìm kiếm đánh giá của người dùng cho bài viết cụ thể
        if (!userId || !articleId) {
            return res.status(400).json({ error: 'userId and articleId are required' });
        }
        
        rating = await Rating.findOne({ user: userId, article: articleId });

        if (rating) {
            // Cập nhật đánh giá nếu đã có
            rating.ratingCount = ratingCount;
            await rating.save();
            return res.status(200).json({
                userId: rating.user,
                articleId: rating.article,
                ratingCount: rating.ratingCount,
            });
        }

        // Tạo mới đánh giá nếu chưa có
        rating = new Rating({
            user: userId,
            article: articleId,
            ratingCount,
        });

        await rating.save();
        res.status(201).json({
            userId: rating.user,
            articleId: rating.article,
            ratingCount: rating.ratingCount,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update or create rating' });
    }
};

module.exports = {
    getAllRatings,
    updateOrCreateRating,
};