
// import React from "react";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Heading from "../../../../common/heading/Heading";
// import "./ppost.css";

// const Popular = () => {
//   // Lấy dữ liệu bài viết từ Redux store
//   const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

//   // Sắp xếp bài viết theo số lượt xem từ cao đến thấp
//   const sortedPopular = articles.slice().sort((a, b) => (b.views || 0) - (a.views || 0));

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     rows: 4,
//     slidesPerRow: 1,
//     responsive: [
//       {
//         breakpoint: 800,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           rows: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <section className='popular'>
//         <Heading title='Phổ biến' />
//         <div className='content'>
//           <Slider {...settings}>
//             {sortedPopular.length > 0 ? (
//               sortedPopular.map((val) => {
//                 // Tìm ảnh đầu tiên
//                 const firstImageBlock = val.content_blocks?.find(block => block.type === 'image');
                
//                 return (
//                   <div className='items' key={val._id}>
//                     <div className='box shadow'>
//                       <div className='images row'>
//                         {/* Chỉ hiển thị ảnh đầu tiên */}
//                         {firstImageBlock && (
//                           <div className='img'>
//                             <img 
//                               src={firstImageBlock.src} 
//                               alt={firstImageBlock.alt || "Image"} 
//                             />
//                           </div>
//                         )}
//                         <div className='category category1'>
//                           <span>{val.category?.name || val.category || 'Unknown Category'}</span>
//                         </div>
//                       </div>
//                       <div className='text row'>
//                         <Link to={`/SinglePage/${val._id}`}>
//                           <h1 className='title'>{val.title?.slice(0, 40) || 'No Title'}...</h1>
//                         </Link>
//                         <div className='date'>
//                           <i className='fas fa-calendar-days'></i>
//                           <label>{val.createdAt ? new Date(val.createdAt).toLocaleDateString() : 'Unknown Date'}</label>
//                         </div>
//                         <div className='views'>
//                           <i className='fas fa-eye'></i>
//                           <label>{val.views || 0} views</label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>Không có bài báo phổ biến nào.</p>
//             )}
//           </Slider>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Popular;
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../../../common/heading/Heading";
import "./ppost.css";

// Hàm trích xuất hình ảnh đầu tiên từ chuỗi HTML
const extractFirstImage = (htmlContent) => {
  if (typeof htmlContent !== 'string') return null;
  const imgTagMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
  if (imgTagMatch && imgTagMatch[1]) {
    return imgTagMatch[1].replace(/&amp;/g, '&'); // Thay thế &amp; thành &
  }
  return null;
};

const Popular = () => {
  // Lấy dữ liệu bài viết từ Redux store
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

  // Sắp xếp bài viết theo số lượt xem từ cao đến thấp
  const sortedPopular = articles.slice().sort((a, b) => (b.views || 0) - (a.views || 0));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 4,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";

  return (
    <>
      <section className='popular'>
        <Heading title='Phổ biến' />
        <div className='content'>
          <Slider {...settings}>
            {sortedPopular.length > 0 ? (
              sortedPopular.map((val) => {
                // Lấy hình ảnh đầu tiên từ nội dung
                const imageSrc = extractFirstImage(val.content) || fallbackImage;
                const imageAlt = "Article cover"; // Bạn có thể tùy chỉnh alt nếu cần

                return (
                  <div className='items' key={val._id}>
                    <div className='box shadow'>
                      <div className='images row'>
                        <div className='img'>
                          <img 
                            src={imageSrc} 
                            alt={imageAlt} 
                          />
                        </div>
                        <div className='category category1'>
                          <span>{val.category?.name || val.category || 'Unknown Category'}</span>
                        </div>
                      </div>
                      <div className='text row'>
                        <Link to={`/SinglePage/${val._id}`}>
                          <h1 className='title'>{val.title?.slice(0, 40) || 'No Title'}...</h1>
                        </Link>
                        <div className='date'>
                          <i className='fas fa-calendar-days'></i>
                          <label>{val.createdAt ? new Date(val.createdAt).toLocaleDateString() : 'Unknown Date'}</label>
                        </div>
                        <div className='views'>
                          <i className='fas fa-eye'></i>
                          <label>{val.views || 0} views</label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Không có bài báo phổ biến nào.</p>
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Popular;
