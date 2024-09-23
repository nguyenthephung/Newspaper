
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Heading from "../../../Customer/common/heading/Heading";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteArticle, getBookMaked, getArticlePending } from "../../../redux/apiRequest";
// import "./publish.css";

// const Publish = () => {
//   const articles = useSelector((state) => state.bookMaked?.getBookMaked?.bookMaked) || [];
//   const user = useSelector((state) => state.auth?.login?.currentUser);
//   const dispatch = useDispatch(); 

//   useEffect(() => {
//     if (user) {
//       getBookMaked(dispatch, user._id);
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     getArticlePending(dispatch);
//   }, [dispatch]);

//   // Sửa hàm handleDelete
//   const handleDelete = (id) => {
//     deleteArticle(dispatch, id).then(() => {
//       // getBookMaked lại để cập nhật danh sách sau khi xóa
//       getBookMaked(dispatch, user._id);
//     });
//   };

//   // Lọc các bài viết đã xuất bản
//   const publishedArticles = articles.filter(article => article.publish === true);

//   return (
//     <>
//       <section className='music'>
//         <Heading title='Báo công khai của bạn' />
//         <div className='content'>
//           {publishedArticles.length > 0 ? (
//             publishedArticles.map((val) => (
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
//                       <Link to={`/testpage/${val._id}`}>{val.title.slice(0, 40)}...</Link>
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
//                     <div className="status">
//                       <label><strong>Trạng thái:</strong> </label>
//                       <span className={`status-label ${val.status}`}>
//                         {val.status === 'pending' && 'Pending Review'}
//                         {val.status === 'approved' && 'Approved'}
//                         {val.status === 'rejected' && 'Rejected'}
//                       </span>
//                     </div>
//                     <button onClick={() => handleDelete(val._id)} className='delete-button'>
//                       Xóa
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No published articles available</p>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Publish;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Heading from "../../../Customer/common/heading/Heading";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle, getBookMaked, getArticlePending } from "../../../redux/apiRequest";
import "./publish.css";

const Publish = () => {
  const articles = useSelector((state) => state.bookMaked?.getBookMaked?.bookMaked) || [];
  const user = useSelector((state) => state.auth?.login?.currentUser);
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

  const publishedArticles = articles.filter(article => article.publish === true);

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
        <Heading title='Báo công khai của bạn' />
        <div className='content'>
          {publishedArticles.length > 0 ? (
            publishedArticles.map((val) => (
              <div className='items' key={val._id}>
                <div className='box shadow flexSB'>
                  <div className='images'>
                    {val.content && (
                      <div className='img'>
                        <img src={extractFirstImage(val.content)} alt="Article" />
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
                    <div className="status">
                      <label><strong>Trạng thái:</strong> </label>
                      <span className={`status-label ${val.status}`}>
                        {val.status === 'pending' && 'Pending Review'}
                        {val.status === 'approved' && 'Approved'}
                        {val.status === 'rejected' && 'Rejected'}
                      </span>
                    </div>
                    <button onClick={() => handleDelete(val._id)} className='delete-button'>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No published articles available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Publish;
