// import React from "react";
// import { Link } from "react-router-dom";

// const Card = ({ item: { _id, title, content_blocks, author, category, tags, totalRating, ratingCount, createdAt } }) => {
//   // Lấy thông tin hình ảnh từ các content block
//   const coverImage = content_blocks.find(block => block.type === 'image')?.src || '';

//   // Lấy ngày tạo bài viết theo định dạng
//   const formattedDate = new Date(createdAt).toLocaleDateString();

//   return (
//     <div className='box'>
//       <div className='img'>
//         <img src={coverImage} alt='Article cover' />
//       </div>
//       <div className='text'>
//         {/* Hiển thị danh mục */}
//         <span className='category'>{category}</span>
//         <Link to={`/SinglePage/${_id}`}>
//           <h1 className='titleBg'>{title}</h1>
//         </Link>
//         <div className='author flex'>
//           {/* Hiển thị tên tác giả và ngày tạo bài viết */}
//           <span>by {author}</span>
//           <span>{formattedDate}</span>
//         </div>
//         <div className='rating'>
//           {/* Hiển thị tổng số điểm và số lượng đánh giá */}
//           <span>Total Rating: {totalRating}</span>

//           <span>. Rating Count: {ratingCount}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
import React from "react";
import { Link } from "react-router-dom";

// Hàm trích xuất hình ảnh đầu tiên từ chuỗi HTML
const extractFirstImage = (htmlContent) => {
  if (typeof htmlContent !== 'string') return null;
  const imgTagMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
  if (imgTagMatch && imgTagMatch[1]) {
    return imgTagMatch[1].replace(/&amp;/g, '&'); // Thay thế &amp; thành &
  }
  return null;
};

const Card = ({ item: { _id, title, content, author, category, tags, totalRating, ratingCount, createdAt } }) => {
  // Lấy thông tin hình ảnh từ content
  const coverImage = extractFirstImage(content) || "https://via.placeholder.com/400x300?text=No+Image+Available";

  // Lấy ngày tạo bài viết theo định dạng
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className='box'>
      <div className='img'>
        <img src={coverImage} alt='Article cover' />
      </div>
      <div className='text'>
        {/* Hiển thị danh mục */}
        <span className='category'>{category}</span>
        <Link to={`/SinglePage/${_id}`}>
          <h1 className='titleBg'>{title.slice(0, 40)}{title.length > 40 ? '...' : ''}</h1>
        </Link>
        <div className='author flex'>
          {/* Hiển thị tên tác giả và ngày tạo bài viết */}
          <span>by {author}</span>
          <span>{formattedDate}</span>
        </div>
        <div className='rating'>
          {/* Hiển thị tổng số điểm và số lượng đánh giá */}
          <span>Total Rating: {totalRating}</span>
          <span>. Rating Count: {ratingCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
