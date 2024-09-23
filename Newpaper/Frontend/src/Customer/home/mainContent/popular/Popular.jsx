
// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Heading from "../../../common/heading/Heading";
// import "./Popular.css";

// const Popular = () => {
//   // Lấy dữ liệu articles từ Redux store
//   const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

//   const settings = {
//     className: "center",
//     centerMode: false,
//     dots: true,
//     infinite: true,
//     centerPadding: "0",
//     slidesToShow: 2,
//     speed: 500,
//     rows: 6,
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

//   // Giả sử bạn muốn lấy các bài viết có nhiều lượt xem nhất hoặc xếp hạng cao nhất, lọc bài viết từ Redux store
//   const popularArticles = articles.slice(4); // Lấy từ phần tử thứ 5 trở đi, có thể tùy chỉnh theo nhu cầu

//   return (
//     <>
//       <section className="popular">
//         <Heading title="Báo mới" />
//         <div className="content">
//           <Slider {...settings}>
//             {popularArticles.length > 0 ? (
//               popularArticles.map((val) => {
//                 // Lấy thông tin hình ảnh từ content_blocks
//                 const coverImage = val.content_blocks?.find((block) => block.type === "image")?.src || "";
                
//                 // Hình ảnh dự phòng nếu không có hình ảnh từ bài viết
//                 const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";

//                 return (
//                   <div className="items" key={val._id}>
//                     <div className="box shadow">
//                       <div className="images row">
//                         <div className="img">
//                           <img
//                             src={coverImage || fallbackImage}  // Sử dụng hình ảnh dự phòng nếu coverImage không tồn tại
//                             alt={val.title || "No Title"}
//                           />
//                         </div>
//                         <div className="category category1">
//                           <span>{val.category || 'Unknown Category'}</span>
//                         </div>
//                       </div>
//                       <div className="text row">
//                         <Link to={`/singlePage/${val._id}`}>
//                           <h1 className="title">{val.title?.slice(0, 40) || 'No Title'}...</h1>
//                         </Link>
//                         <div className="date">
//                           <i className="fas fa-calendar-days"></i>
//                           <label>{val.createdAt ? new Date(val.createdAt).toLocaleDateString() : 'Unknown Date'}</label>
//                         </div>
//                         <div className="comment">
//                           <i className="fas fa-comments"></i>
//                           <label>{val.ratingCount || 0} comments</label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>Không có bài báo nào phổ biến.</p>
//             )}
//           </Slider>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Popular;
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heading from "../../../common/heading/Heading";
import "./Popular.css";

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
  // Lấy dữ liệu articles từ Redux store
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

  const settings = {
    className: "center",
    centerMode: false,
    dots: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 6,
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

  // Lấy các bài viết bắt đầu từ phần tử thứ 5
  const popularArticles = articles.slice(4); // Có thể tùy chỉnh theo nhu cầu

  // Hình ảnh dự phòng nếu không có hình ảnh từ bài viết
  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";

  return (
    <>
      <section className="popular">
        <Heading title="Báo mới" />
        <div className="content">
          <Slider {...settings}>
            {popularArticles.length > 0 ? (
              popularArticles.map((val) => {
                // Lấy hình ảnh đầu tiên từ nội dung
                const coverImage = extractFirstImage(val.content) || fallbackImage;

                return (
                  <div className="items" key={val._id}>
                    <div className="box shadow">
                      <div className="images row">
                        <div className="img">
                          <img
                            src={coverImage}  // Sử dụng hình ảnh đã trích xuất
                            alt={val.title || "No Title"}
                          />
                        </div>
                        <div className="category category1">
                          <span>{val.category || 'Unknown Category'}</span>
                        </div>
                      </div>
                      <div className="text row">
                        <Link to={`/singlePage/${val._id}`}>
                          <h1 className="title">{val.title?.slice(0, 40) || 'No Title'}...</h1>
                        </Link>
                        <div className="date">
                          <i className="fas fa-calendar-days"></i>
                          <label>{val.createdAt ? new Date(val.createdAt).toLocaleDateString() : 'Unknown Date'}</label>
                        </div>
                        <div className="comment">
                          <i className="fas fa-comments"></i>
                          <label>{val.ratingCount || 0} comments</label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Không có bài báo nào phổ biến.</p>
            )}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Popular;
