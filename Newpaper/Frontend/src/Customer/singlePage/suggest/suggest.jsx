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
  const { id } = useParams();
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const posts = articles.filter((post) => 
      post.category === category && post.id !== id
    );
    setFilteredPosts(posts);
  }, [id, articles, category]);

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

  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";
  const categoryTitle = typeof category === 'string' && category.trim() !== ''
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} `
    : "";

  return (
    <section className="popularPost life">
      <Heading title={categoryTitle} />
      <div className="content">
        {filteredPosts.length > 0 && (
          <Slider {...settings}>
            {filteredPosts.map((post) => {
              const imageBlock = post.content_blocks.find(block => block.type === "image");
              const imageSrc = imageBlock ? imageBlock.src : fallbackImage;
              const imageAlt = imageBlock ? imageBlock.alt : "No Image";

              return (
                <div className="items" key={post.id} style={{ padding: "10px" }}>
                  <div
                    className="box shadow"
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="images" style={{ flexShrink: 0 }}>
                      <div className="img" style={{ overflow: "hidden", borderRadius: "8px 8px 0 0" }}>
                        <img
                          src={imageSrc}
                          alt={imageAlt}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="category category1" style={{ marginTop: "10px" }}>
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <div className="text" style={{ padding: "15px", flexGrow: 1 }}>
                      <h1 className="title" style={{ fontSize: "18px", marginBottom: "10px" }}>
                        <Link to={`/SinglePage/${post._id}`}>{post.title.slice(0, 40)}...</Link>
                      </h1>
                      <div className="date" style={{ fontSize: "14px", color: "#888" }}>
                        <i className="fas fa-calendar-days"></i>
                        <label style={{ marginLeft: "5px" }}>{post.date}</label>
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
