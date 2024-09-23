// // Draft.js

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Heading from "../../../Customer/common/heading/Heading";
// import "./draft.css";

// // Dữ liệu mẫu
// const popular = [
//   {
//     _id: "sampleId123",
//     title: "Sample Article Title 1",
//     content_blocks: [
//       { type: "paragraph", content: "This is a sample paragraph." },
//       { type: "image", src: "https://via.placeholder.com/150", alt: "Sample Image" },
//       { type: "quote", content: "This is a sample quote." }
//     ],
//     author: "Sample Author 1",
//     category: { name: "fun" },
//     totalRating: 10,
//     ratingCount: 5,
//     Publish: false,
//     views: 150,
//     createdAt: "2024-08-17T00:00:00Z"
//   },
//   // Thêm các bài viết khác nếu cần
// ];

// const Draft = () => {
//   const [articles, setArticles] = useState(popular);
//   const navigate = useNavigate();

//   const handleDelete = (id) => {
//     setArticles(articles.filter(article => article._id !== id));
//     console.log(`Article with id ${id} deleted`);
//   };

//   const handleEdit = (article) => {
//     navigate('/writer', { state: { article } });
//   };

//   return (
//     <>
//       <section className='music'>
//         <Heading title='Báo nháp của bạn' />
//         <div className='content'>
//           {articles.length > 0 ? (
//             articles.map((val) => (
//               <div className='items' key={val._id}>
//                 <div className='box shadow flexSB'>
//                   <div className='images'>
//                     {val.content_blocks
//                       .filter(block => block.type === 'image')
//                       .map((block, index) => (
//                         <div className='img' key={index}>
//                           <img src={block.src} alt={block.alt} />
//                         </div>
//                       ))}
//                     <div className='category category1'>
//                       <span>{val.category.name}</span>
//                     </div>
//                   </div>
//                   <div className='text'>
//                     <h1 className='title'>
//                       <Link to={`/SinglePage/${val._id}`}>{val.title.slice(0, 40)}...</Link>
//                     </h1>
//                     <div className='date'>
//                       <i className='fas fa-calendar-days'></i>
//                       <label>{new Date(val.createdAt).toLocaleDateString()}</label>
//                     </div>
//                     <p className='desc'>{val.content_blocks.find(block => block.type === 'paragraph')?.content.slice(0, 250)}...</p>
//                     <div className='comment'>
//                       <i className='fas fa-share'></i>
//                       <label>Share / </label>
//                       <i className='fas fa-comments'></i>
//                       <label>{val.ratingCount}</label>
//                     </div>
//                     <button onClick={() => handleEdit(val)} className='edit-button'>
//                       Chỉnh sửa
//                     </button>
//                     <button onClick={() => handleDelete(val._id)} className='delete-button'>
//                       Xóa
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No drafts available</p>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Draft;
// Draft.js

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../../../Customer/common/heading/Heading";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle, getBookMaked, getArticlePending } from "../../../redux/apiRequest";
import "./draft.css";

const Draft = () => {
  const articles = useSelector((state) => state.bookMaked?.getBookMaked?.bookMaked) || [];
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  useEffect(() => {
    if (user) {
      getBookMaked(dispatch, user._id);
    }
  }, [dispatch, user]);

  useEffect(() => {
    getArticlePending(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteArticle(dispatch, id).then(() => {
      getBookMaked(dispatch, user._id);
    });
  };

  const handleEdit = (article) => {
    navigate('/writer', { state: { article } }); // Đảm bảo đường dẫn '/writer' là đúng
  };

  const unpublishedArticles = articles.filter(article => article.publish === false);

  const extractFirstImage = (content) => {
    const imgTag = content.match(/<img[^>]+src="([^">]+)"/);
    if (imgTag) {
      return imgTag[1].replace(/&amp;/g, '&'); // Thay thế &amp; thành &
    }
    return null;
  };
  
  const extractTextContent = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <>
      <section className='music'>
        <Heading title='Báo nháp của bạn' />
        <div className='content'>
          {unpublishedArticles.length > 0 ? (
            unpublishedArticles.map((val) => (
              <div className='items' key={val._id}>
                <div className='box shadow flexSB'>
                  <div className='images'>
                    {val.content && (
                      <div className='img'>
                        <img src={extractFirstImage(val.content)} alt="Draft Article" />
                      </div>
                    )}
                    <div className='category category1'>
                      <span>{val.category}</span>
                    </div>
                  </div>
                  <div className='text'>
                    <h1 className='title'>
                      <Link to={`/testpage/${val._id}`}>{val.title.slice(0, 40)}...</Link>
                    </h1>
                    <div className='date'>
                      <i className='fas fa-calendar-days'></i>
                      <label>{new Date(val.createdAt).toLocaleDateString()}</label>
                    </div>
                    <p className='desc'>
                      {val.content ? extractTextContent(val.content).slice(0, 250) : ''}...
                    </p>
                    <div className='comment'>
                      <i className='fas fa-share'></i>
                      <label>Share / </label>
                      <i className='fas fa-comments'></i>
                      <label>{val.ratingCount}</label>
                    </div>
                    <button onClick={() => handleEdit(val)} className='edit-button'>
                      Chỉnh sửa
                    </button>
                    <button onClick={() => handleDelete(val._id)} className='delete-button'>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No drafts available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Draft;
