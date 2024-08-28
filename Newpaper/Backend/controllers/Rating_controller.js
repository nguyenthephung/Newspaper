const Rating = require('../models/Rating_model');

// Hàm lấy tất cả ratings chỉ trả về các trường userId, articleId, và ratingCount
const getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({}, 'user article ratingCount')
            .populate('user', '_id')
            .populate('article', '_id');

        // Chuyển đổi kết quả để chỉ bao gồm các trường userId, articleId, và ratingCount
        const result = ratings.map(rating => ({
            userId: rating.user._id,
            articleId: rating.article._id,
            ratingCount: rating.ratingCount,
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