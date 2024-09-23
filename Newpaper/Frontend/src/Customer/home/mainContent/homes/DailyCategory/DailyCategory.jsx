

// // export default DailyCategory;

// import React, { useState } from "react";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Heading from "../../../../common/heading/Heading";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./DailyCategory.css";

// const DailyCategory = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   // Lấy dữ liệu articles từ Redux store
//   const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

//   // Lọc dữ liệu theo ngày
//   const filteredArticles = articles.filter((article) => {
//     const articleDate = new Date(article.createdAt).toLocaleDateString();
//     return articleDate === selectedDate.toLocaleDateString();
//   });

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//   };

//   return (
//     <>
//       <section className='dailyCategory'>
//         <Heading title='Danh mục theo ngày' />
//         <div className='date-picker'>
//           <DatePicker
//             selected={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//             dateFormat="dd/MM/yyyy"
//             className="date-picker-input"
//           />
//         </div>
//         <div className='content'>
//           {filteredArticles.length > 0 ? (
//             <Slider {...settings}>
//               {filteredArticles.map((val) => {
//                 // Lấy ảnh đầu tiên trong content_blocks
//                 const firstImageBlock = val.content_blocks.find(block => block.type === "image");
//                 const imageSrc = firstImageBlock ? firstImageBlock.src : null;
//                 const imageAlt = firstImageBlock ? firstImageBlock.alt : "No Image";

//                 return (
//                   <div className='items' key={val._id}>
//                     <div className='box shadow'>
//                       <div className='images'>
//                         {imageSrc && (
//                           <div className='img'>
//                             <img src={imageSrc} alt={imageAlt} />
//                           </div>
//                         )}
//                       </div>
//                       <div className='text'>
//                         <Link to={`/SinglePage/${val._id}`}>
//                           <h1 className='title'>{val.title.slice(0, 40)}...</h1>
//                         </Link>
//                         <div className='date'>
//                           <i className='fas fa-calendar-days'></i>
//                           <label>{new Date(val.createdAt).toLocaleDateString()}</label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </Slider>
//           ) : (
//             <p>Không có bài báo nào cho ngày đã chọn.</p>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default DailyCategory;
// DailyCategory.jsx

import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../../../common/heading/Heading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DailyCategory.css";

// Hàm trích xuất hình ảnh đầu tiên từ chuỗi HTML
const extractFirstImage = (htmlContent) => {
  if (typeof htmlContent !== 'string') return null;
  const imgTagMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
  if (imgTagMatch && imgTagMatch[1]) {
    return imgTagMatch[1].replace(/&amp;/g, '&'); // Thay thế &amp; thành &
  }
  return null;
};

const DailyCategory = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Lấy dữ liệu articles từ Redux store
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

  // Lọc dữ liệu theo ngày
  const filteredArticles = articles.filter((article) => {
    const articleDate = new Date(article.createdAt).toLocaleDateString();
    return articleDate === selectedDate.toLocaleDateString();
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";

  return (
    <>
      <section className='dailyCategory'>
        <Heading title='Danh mục theo ngày' />
        <div className='date-picker'>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="date-picker-input"
          />
        </div>
        <div className='content'>
          {filteredArticles.length > 0 ? (
            <Slider {...settings}>
              {filteredArticles.map((val) => {
                // Kiểm tra xem val.content có tồn tại và là một chuỗi hay không
                if (!val.content || typeof val.content !== 'string') {
                  return (
                    <div className='items' key={val._id}>
                      <div className='box shadow'>
                        <div className='images'>
                          <div className='img'>
                            <img src={fallbackImage} alt="No Image Available" />
                          </div>
                        </div>
                        <div className='text'>
                          <Link to={`/SinglePage/${val._id}`}>
                            <h1 className='title'>{val.title.slice(0, 40)}{val.title.length > 40 ? '...' : ''}</h1>
                          </Link>
                          <div className='date'>
                            <i className='fas fa-calendar-days'></i>
                            <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Lấy ảnh đầu tiên trong content
                const imageSrc = extractFirstImage(val.content) || fallbackImage;
                const imageAlt = "Article cover"; // Bạn có thể tùy chỉnh alt nếu cần

                return (
                  <div className='items' key={val._id}>
                    <div className='box shadow'>
                      <div className='images'>
                        <div className='img'>
                          <img src={imageSrc} alt={imageAlt} />
                        </div>
                      </div>
                      <div className='text'>
                        <Link to={`/SinglePage/${val._id}`}>
                          <h1 className='title'>{val.title.slice(0, 40)}{val.title.length > 40 ? '...' : ''}</h1>
                        </Link>
                        <div className='date'>
                          <i className='fas fa-calendar-days'></i>
                          <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          ) : (
            <p>Không có bài báo nào cho ngày đã chọn.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default DailyCategory;
