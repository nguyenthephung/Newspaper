
// import React from "react";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Heading from "../../../../common/heading/Heading";
// import "./interested.css";

// const Interested = () => {
//   // Lấy dữ liệu bài viết từ Redux store
//   const articles = useSelector((state) => state.article?.getArticle?.articles) || [];
//   // Lọc các bài báo theo category "Thể thao"
//   const funArticles = articles.filter((val) => val.category === "Thể thao");

//   const settings = {
//     dots: true,
//     className: "center",
//     centerMode: true,
//     infinite: true,
//     centerPadding: "0",
//     slidesToShow: 1,
//     speed: 500,
//     rows: 2,
//     slidesPerRow: 1,
//   };

//   // URL hình ảnh dự phòng nếu không có hình ảnh từ bài viết
//   const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";

//   return (
//     <>
//       <section className='music'>
//         <Heading title='Có thể bạn quan tâm' />
//         <div className='content'>
//           <Slider {...settings}>
//             {funArticles.length > 0 ? (
//               funArticles.map((val) => {
//                 // Lấy hình ảnh đầu tiên từ content_blocks
//                 const firstImage = val.content_blocks?.find(block => block.type === 'image');
//                 const imageSrc = firstImage ? firstImage.src : fallbackImage;
//                 const imageAlt = firstImage ? firstImage.alt : "No Image";

//                 return (
//                   <div className='items' key={val._id}>
//                     <div className='box shadow flexSB'>
//                       <div className='images'>
//                         <div className='img'>
//                           <img src={imageSrc} alt={imageAlt} />
//                         </div>
//                         <div className='category category1'>
//                           <span>{val.category}</span>
//                         </div>
//                       </div>
//                       <div className='text'>
//                         <h1 className='title'>
//                           <Link to={`/SinglePage/${val._id}`}>{val.title?.slice(0, 40)}...</Link>
//                         </h1>
//                         <div className='date'>
//                           <i className='fas fa-calendar-days'></i>
//                           <label>{new Date(val.createdAt).toLocaleDateString()}</label>
//                         </div>
//                         <p className='desc'>{val.content_blocks?.find(block => block.type === 'paragraph')?.content?.slice(0, 250)}...</p>
//                         <div className='comment'>
//                           <i className='fas fa-share'></i>
//                           <label>Share / </label>
//                           <i className='fas fa-comments'></i>
//                           <label>{val.ratingCount || 0}</label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>Không có bài báo nào thuộc danh mục "Thể thao".</p>
//             )}
//           </Slider>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Interested;
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../../../common/heading/Heading";
import "./interested.css";

// Hàm trích xuất hình ảnh đầu tiên từ chuỗi HTML
const extractFirstImage = (htmlContent) => {
  if (typeof htmlContent !== 'string') return null;
  const imgTagMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
  if (imgTagMatch && imgTagMatch[1]) {
    return imgTagMatch[1].replace(/&amp;/g, '&'); // Thay thế &amp; thành &
  }
  return null;
};

const Interested = () => {
  // Lấy dữ liệu bài viết từ Redux store
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];
  // Lọc các bài báo theo category "Thể thao"
  const funArticles = articles.filter((val) => val.category === "Thể thao");

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };

  // URL hình ảnh dự phòng nếu không có hình ảnh từ bài viết
  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";

  return (
    <>
      <section className='music'>
        <Heading title='Có thể bạn quan tâm' />
        <div className='content'>
          <Slider {...settings}>
            {funArticles.length > 0 ? (
              funArticles.map((val) => {
                // Lấy hình ảnh đầu tiên từ nội dung
                const imageSrc = extractFirstImage(val.content) || fallbackImage;
                const imageAlt = "Article cover"; // Bạn có thể tùy chỉnh alt nếu cần

                return (
                  <div className='items' key={val._id}>
                    <div className='box shadow flexSB'>
                      <div className='images'>
                        <div className='img'>
                          <img src={imageSrc} alt={imageAlt} />
                        </div>
                        <div className='category category1'>
                          <span>{val.category}</span>
                        </div>
                      </div>
                      <div className='text'>
                        <h1 className='title'>
                          <Link to={`/SinglePage/${val._id}`}>{val.title?.slice(0, 40)}...</Link>
                        </h1>
                        <div className='date'>
                          <i className='fas fa-calendar-days'></i>
                          <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                        </div>
                        <p className='desc'>{val.content?.find(content => content.type === 'paragraph')?.content?.slice(0, 250)}...</p>
                        <div className='comment'>
                          <i className='fas fa-share'></i>
                          <label>Share / </label>
                          <i className='fas fa-comments'></i>
                          <label>{val.ratingCount || 0}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Không có bài báo nào thuộc danh mục "Thể thao".</p>
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Interested;
