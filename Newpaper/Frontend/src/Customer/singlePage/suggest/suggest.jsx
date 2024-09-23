

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Slider from "react-slick";
// import Heading from "../../common/heading/Heading";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useSelector } from "react-redux";

// const Suggest = ({ category }) => {
//   const { id } = useParams();
//   const articles = useSelector((state) => state.article?.getArticle?.articles) || [];
//   const [filteredPosts, setFilteredPosts] = useState([]);

//   useEffect(() => {
//     const posts = articles.filter((post) => 
//       post.category === category && post.id !== id
//     );
//     setFilteredPosts(posts);
//   }, [id, articles, category]);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     adaptiveHeight: true,
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

//   const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";
//   const categoryTitle = typeof category === 'string' && category.trim() !== ''
//     ? `${category.charAt(0).toUpperCase() + category.slice(1)} `
//     : "";

//   return (
//     <section className="popularPost life">
//       <Heading title={categoryTitle} />
//       <div className="content">
//         {filteredPosts.length > 0 && (
//           <Slider {...settings}>
//             {filteredPosts.map((post) => {
//               const imageBlock = post.content_blocks.find(block => block.type === "image");
//               const imageSrc = imageBlock ? imageBlock.src : fallbackImage;
//               const imageAlt = imageBlock ? imageBlock.alt : "No Image";

//               return (
//                 <div className="items" key={post.id} style={{ padding: "10px" }}>
//                   <div
//                     className="box shadow"
//                     style={{
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     <div className="images" style={{ flexShrink: 0 }}>
//                       <div className="img" style={{ overflow: "hidden", borderRadius: "8px 8px 0 0" }}>
//                         <img
//                           src={imageSrc}
//                           alt={imageAlt}
//                           style={{
//                             width: "100%",
//                             height: "200px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </div>
//                       <div className="category category1" style={{ marginTop: "10px" }}>
//                         <span>{post.category}</span>
//                       </div>
//                     </div>
//                     <div className="text" style={{ padding: "15px", flexGrow: 1 }}>
//                       <h1 className="title" style={{ fontSize: "18px", marginBottom: "10px" }}>
//                         <Link to={`/SinglePage/${post._id}`}>{post.title.slice(0, 40)}...</Link>
//                       </h1>
//                       <div className="date" style={{ fontSize: "14px", color: "#888" }}>
//                         <i className="fas fa-calendar-days"></i>
//                         <label style={{ marginLeft: "5px" }}>{post.date}</label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
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
      post.category === category && post._id !== id
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

  // Hàm trích xuất hình ảnh đầu tiên từ chuỗi HTML
  const extractFirstImage = (htmlContent) => {
    const imgTag = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    if (imgTag) {
      return imgTag[1].replace(/&amp;/g, '&'); // Thay thế &amp; thành &
    }
    return null;
  };

  // Hàm trích xuất nội dung văn bản từ HTML (nếu cần)
  const extractTextContent = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <section className="popularPost life">
      <Heading title={categoryTitle} />
      <div className="content">
        {filteredPosts.length > 0 ? (
          <Slider {...settings}>
            {filteredPosts.map((post) => {
              const imageSrc = extractFirstImage(post.content) || fallbackImage;
              const imageAlt = post.title || "No Image";

              return (
                <div className="items" key={post._id} style={{ padding: "10px" }}>
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
                        <label style={{ marginLeft: "5px" }}>{new Date(post.createdAt).toLocaleDateString()}</label>
                      </div>
                      {/* Nếu muốn hiển thị đoạn trích nội dung */}
                      <p className="desc" style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
                        {post.content ? extractTextContent(post.content).slice(0, 100) : ''}...
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <p>No suggestions available</p>
        )}
      </div>
    </section>
  );
};

export default Suggest;
