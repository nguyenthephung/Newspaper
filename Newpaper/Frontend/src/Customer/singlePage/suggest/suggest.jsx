// import React from "react";
// import { Link } from "react-router-dom"; // Import Link
// import Slider from "react-slick";
// import Heading from "../../common/heading/Heading";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Suggest = ({ category }) => {
//   const popular = [
//     {
//       id: "64a1d6f1f1b2b1b7d1c2d3e4", // Giả định ID bài viết
//       title: "Our Favorite Photos From All Around",
//       content_blocks: [
//         {
//           type: "paragraph",
//           content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
//         },
//         {
//           type: "image",
//           src: "https://via.placeholder.com/150",
//           alt: "Sample Image"
//         }
//       ],
//       author: "Author Name",
//       category: "world", // Giả định ID category
//       tags: ["64a1d6f1f1b2b1b7d1c2d3e4"], // Giả định ID tag
//       status: "approved",
//       Publish: true,
//       views: 100,
//       totalRating: 25,
//       ratingCount: 5,
//       date: "2022-02-19"
//     },
//     {
//       id: "64a1d6f1f1b2b1b7d1c2d3e4", // Giả định ID bài viết
//       title: "Our Favorite Photos From All Around",
//       content_blocks: [
//         {
//           type: "paragraph",
//           content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
//         },
//         {
//           type: "image",
//           src: "https://via.placeholder.com/150",
//           alt: "Sample Image"
//         }
//       ],
//       author: "Author Name",
//       category: "world", // Giả định ID category
//       tags: ["64a1d6f1f1b2b1b7d1c2d3e4"], // Giả định ID tag
//       status: "approved",
//       Publish: true,
//       views: 100,
//       totalRating: 25,
//       ratingCount: 5,
//       date: "2022-02-19"
//     },
//     {
//       id: "64a1d6f1f1b2b1b7d1c2d3e4", // Giả định ID bài viết
//       title: "Our Favorite Photos From All Around",
//       content_blocks: [
//         {
//           type: "paragraph",
//           content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
//         },
//         {
//           type: "image",
//           src: "https://via.placeholder.com/150",
//           alt: "Sample Image"
//         }
//       ],
//       author: "Author Name",
//       category: "world", // Giả định ID category
//       tags: ["64a1d6f1f1b2b1b7d1c2d3e4"], // Giả định ID tag
//       status: "approved",
//       Publish: true,
//       views: 100,
//       totalRating: 25,
//       ratingCount: 5,
//       date: "2022-02-19"
//     },
//     {
//       id: "64a1d6f1f1b2b1b7d1c2d3e4", // Giả định ID bài viết
//       title: "Our Favorite Photos From All Around",
//       content_blocks: [
//         {
//           type: "paragraph",
//           content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
//         },
//         {
//           type: "image",
//           src: "https://via.placeholder.com/150",
//           alt: "Sample Image"
//         }
//       ],
//       author: "Author Name",
//       category: "world", // Giả định ID category
//       tags: ["64a1d6f1f1b2b1b7d1c2d3e4"], // Giả định ID tag
//       status: "approved",
//       Publish: true,
//       views: 100,
//       totalRating: 25,
//       ratingCount: 5,
//       date: "2022-02-19"
//     },
//     // Thêm các bài viết khác theo cấu trúc tương tự
//   ];

//   // Lọc và chỉ lấy bài viết theo category
//   const filteredPosts = popular.filter((post) => post.category === category);

//   // Cấu hình của slider
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
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <section className="popularPost life">
//       <Heading title={`${category.charAt(0).toUpperCase() + category.slice(1)} Articles`} />
//       <div className="content">
//         {filteredPosts.length > 0 && (
//           <Slider {...settings}>
//             {filteredPosts.map((post) => (
//               <div className="items" key={post.id}>
//                 <div className="box shadow">
//                   <div className="images">
//                     <div className="img">
//                       {/* Cập nhật để sử dụng ảnh từ nội dung bài viết */}
//                       {post.content_blocks.find(block => block.type === "image") && (
//                         <img src={post.content_blocks.find(block => block.type === "image").src} alt={post.content_blocks.find(block => block.type === "image").alt} />
//                       )}
//                     </div>
//                     <div className="category category1">
//                       {/* Cập nhật để sử dụng tên danh mục */}
//                       <span>{post.category}</span>
//                     </div>
//                   </div>
//                   <div className="text">
//                     <h1 className="title">
//                       <Link to={`/SinglePage/${post.id}`}>{post.title.slice(0, 40)}...</Link>
//                     </h1>
//                     <div className="date">
//                       <i className="fas fa-calendar-days"></i>
//                       <label>{post.date}</label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Suggest;


import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Heading from "../../common/heading/Heading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const Suggest = ({ category }) => {
  // Nhận ID từ useParams
  const { id } = useParams();

  // Lấy dữ liệu từ Redux store
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

  // Tạo state để lưu trữ bài viết đã lọc
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Sử dụng useEffect để lọc lại bài viết mỗi khi id hoặc articles thay đổi
  useEffect(() => {
    const posts = articles.filter((post) => 
      post.category === category && post.id !== id
    );
    setFilteredPosts(posts);
  }, [id, articles, category]);

  // Cấu hình của slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // URL hình ảnh dự phòng nếu không có hình ảnh từ bài viết
  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";

  // Đảm bảo category là một chuỗi không rỗng và không phải là undefined
  const categoryTitle = typeof category === 'string' && category.trim() !== ''
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`
    : "Articles";

  return (
    <section className="popularPost life">
      <Heading title={categoryTitle} />
      <div className="content">
        {filteredPosts.length > 0 && (
          <Slider {...settings}>
            {filteredPosts.map((post) => {
              // Tìm hình ảnh từ content_blocks
              const imageBlock = post.content_blocks.find(block => block.type === "image");
              const imageSrc = imageBlock ? imageBlock.src : fallbackImage;
              const imageAlt = imageBlock ? imageBlock.alt : "No Image";

              return (
                <div className="items" key={post.id}>
                  <div className="box shadow">
                    <div className="images">
                      <div className="img">
                        <img src={imageSrc} alt={imageAlt} />
                      </div>
                      <div className="category category1">
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <div className="text">
                      <h1 className="title">
                        <Link to={`/SinglePage/${post._id}`}>{post.title.slice(0, 40)}...</Link>
                      </h1>
                      <div className="date">
                        <i className="fas fa-calendar-days"></i>
                        <label>{post.date}</label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Suggest;
