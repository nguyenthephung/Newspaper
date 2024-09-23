

// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Heading from "../../../common/heading/Heading";
// import "./tpost.css";

// const Tpost = () => {
//   // Lấy dữ liệu article từ redux store
//   const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

//   // Lọc các bài báo có danh mục là "genz"
//   const filteredArticles = articles.filter((article) => article.category === "Giải trí");

//   // URL hình ảnh dự phòng nếu không có hình ảnh từ bài viết
//   const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";

//   return (
//     <>
//       <section className="tpost">
//         <Heading title="Giải trí" />
//         {filteredArticles.length > 0 ? (
//           filteredArticles.map((val, index) => {
//             // Lấy thông tin hình ảnh từ content_blocks
//             const imageBlock = val.content_blocks?.find((block) => block.type === "image") || {};
//             const coverImageSrc = imageBlock.src || fallbackImage;
//             const coverImageAlt = imageBlock.alt || "No Image";

//             return (
//               <div className="box flexSB" key={index}>
//                 <div className="img">
//                   <img
//                     src={coverImageSrc}
//                     alt={coverImageAlt}
//                   />
//                 </div>
//                 <div className="text">
//                   <h1 className="title">
//                     <Link to={`/SinglePage/${val._id}`}>
//                       {val.title?.slice(0, 35) || "No Title"}...
//                     </Link>
//                   </h1>
//                   <span>{val.createdAt ? new Date(val.createdAt).toDateString() : "Unknown Date"}</span>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p>No articles available for "GenZ".</p>
//         )}
//       </section>
//     </>
//   );
// };

// export default Tpost;
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../../common/heading/Heading";
import "./tpost.css";

// Hàm trích xuất hình ảnh đầu tiên từ chuỗi HTML
const extractFirstImage = (htmlContent) => {
  if (typeof htmlContent !== 'string') return null;
  const imgTagMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
  if (imgTagMatch && imgTagMatch[1]) {
    return imgTagMatch[1].replace(/&amp;/g, '&'); // Thay thế &amp; thành &
  }
  return null;
};

const Tpost = () => {
  // Lấy dữ liệu article từ redux store
  const articles = useSelector((state) => state.article?.getArticle?.articles) || [];

  // Lọc các bài báo có danh mục là "Giải trí"
  const filteredArticles = articles.filter((article) => article.category === "Giải trí");

  // URL hình ảnh dự phòng nếu không có hình ảnh từ bài viết
  const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image+Available";

  return (
    <>
      <section className="tpost">
        <Heading title="Giải trí" />
        {filteredArticles.length > 0 ? (
          filteredArticles.map((val, index) => {
            // Lấy hình ảnh đầu tiên từ nội dung
            const coverImageSrc = extractFirstImage(val.content) || fallbackImage;
            const coverImageAlt = val.title || "No Image";

            return (
              <div className="box flexSB" key={index}>
                <div className="img">
                  <img
                    src={coverImageSrc}
                    alt={coverImageAlt}
                  />
                </div>
                <div className="text">
                  <h1 className="title">
                    <Link to={`/SinglePage/${val._id}`}>
                      {val.title?.slice(0, 35) || "No Title"}...
                    </Link>
                  </h1>
                  <span>{val.createdAt ? new Date(val.createdAt).toDateString() : "Unknown Date"}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p>Không có bài báo nào cho danh mục "Giải trí".</p>
        )}
      </section>
    </>
  );
};

export default Tpost;
