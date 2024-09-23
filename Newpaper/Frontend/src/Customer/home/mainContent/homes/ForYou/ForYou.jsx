

// import React from "react";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Heading from "../../../../common/heading/Heading";
// import "../Ppost/ppost.css";

// const ForYou = () => {
//   // Lấy dữ liệu người dùng và bài viết từ Redux store
//   const user = useSelector((state) => state.auth?.login?.currentUser);
//   const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

//   // Lấy danh sách sở thích người dùng
//   const userFavoriteCategories = Array.isArray(user?.preferences) ? user.preferences : [];

//   // Lọc và sắp xếp bài viết theo sở thích người dùng
//   const filteredAndSortedFavorites = articles
//     .filter(article => userFavoriteCategories.includes(article.category))
//     .sort((a, b) => b.views - a.views);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 800,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <section className='popularPost life'>
//         <Heading title='Dành cho bạn' />
//         <div className='content'>
//           <Slider {...settings}>
//             {filteredAndSortedFavorites.length > 0 ? (
//               filteredAndSortedFavorites.map((val) => {
//                 const firstImageBlock = val.content_blocks?.find(block => block.type === 'image');
//                 return (
//                   <div className='items' key={val._id}>
//                     <div className='box shadow'>
//                       <div className='images'>
//                         <div className='img' style={{ height: '200px', overflow: 'hidden' }}>
//                           {firstImageBlock && (
//                             <img
//                               src={firstImageBlock.src}
//                               alt={firstImageBlock.alt || 'Article image'}
//                               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                             />
//                           )}
//                         </div>
//                         <div className='category category1'>
//                           <span>{val.category}</span>
//                         </div>
//                       </div>
//                       <div className='text'>
//                         <h1 className='title'>
//                           <Link to={`/SinglePage/${val._id}`}>
//                             {val.title?.slice(0, 40)}...
//                           </Link>
//                         </h1>
//                         <div className='date'>
//                           <i className='fas fa-calendar-days'></i>
//                           <label>{new Date(val.createdAt).toLocaleDateString()}</label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>Không có bài báo nào cho danh mục yêu thích của bạn.</p>
//             )}
//           </Slider>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ForYou;
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../../../common/heading/Heading";
import "../Ppost/ppost.css";

// Hàm trích xuất hình ảnh đầu tiên từ chuỗi HTML
const extractFirstImage = (htmlContent) => {
  if (typeof htmlContent !== 'string') return null;
  const imgTagMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
  if (imgTagMatch && imgTagMatch[1]) {
    return imgTagMatch[1].replace(/&amp;/g, '&'); // Thay thế &amp; thành &
  }
  return null;
};

const ForYou = () => {
  // Lấy dữ liệu người dùng và bài viết từ Redux store
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

  // Lấy danh sách sở thích người dùng
  const userFavoriteCategories = Array.isArray(user?.preferences) ? user.preferences : [];

  // Lọc và sắp xếp bài viết theo sở thích người dùng
  const filteredAndSortedFavorites = articles
    .filter(article => userFavoriteCategories.includes(article.category))
    .sort((a, b) => b.views - a.views);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className='popularPost life'>
        <Heading title='Dành cho bạn' />
        <div className='content'>
          <Slider {...settings}>
            {filteredAndSortedFavorites.length > 0 ? (
              filteredAndSortedFavorites.map((val) => {
                // Lấy hình ảnh đầu tiên từ nội dung
                const imageSrc = extractFirstImage(val.content) || "https://via.placeholder.com/400x300?text=No+Image+Available";
                const imageAlt = "Article cover"; // Bạn có thể tùy chỉnh alt nếu cần

                return (
                  <div className='items' key={val._id}>
                    <div className='box shadow'>
                      <div className='images'>
                        <div className='img' style={{ height: '200px', overflow: 'hidden' }}>
                          <img
                            src={imageSrc}
                            alt={imageAlt}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div className='category category1'>
                          <span>{val.category}</span>
                        </div>
                      </div>
                      <div className='text'>
                        <h1 className='title'>
                          <Link to={`/SinglePage/${val._id}`}>
                            {val.title?.slice(0, 40)}...
                          </Link>
                        </h1>
                        <div className='date'>
                          <i className='fas fa-calendar-days'></i>
                          <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Không có bài báo nào cho danh mục yêu thích của bạn.</p>
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default ForYou;
