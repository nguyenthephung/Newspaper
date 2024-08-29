import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import "../Customer/home/mainContent/homes/style.css";
import "./testPage.css";
import 'antd/dist/reset.css';
import { getArticlePending } from "../redux/apiRequest";
const TestPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, [pathname]);
  
  // Lấy dữ liệu từ articlesPending thay vì articles
  const article = useSelector((state) =>
    Array.isArray(state.articlePending?.getArticlePending?.articlesPending)
      ? state.articlePending.getArticlePending.articlesPending.find((a) => a._id === id)
      : null
  );

  return (
    <>
      {article ? (
        <main className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row">
            <section className="mainContent details md:w-2/3 p-4">
              <h1 className="title text-2xl font-bold mb-4">{article.title}</h1>

              <div className="author flex items-center mb-4">
                <span className="text-gray-600">by</span>
                <img src="https://i.pravatar.cc/150?img=10" alt="Random User" className="ml-2 w-8 h-8 rounded-full" />
                <p className="ml-2"> {article.author} on</p>
                <label className="ml-2 text-gray-600">{new Date(article.createdAt).toLocaleString()}</label>
              </div>

              <div className="content">
                {article.content_blocks.map((block, index) => {
                  if (block.type === "paragraph") {
                    return <p key={index} className="my-4 text-justify leading-relaxed">{block.content}</p>;
                  } else if (block.type === "image") {
                    return (
                      <div key={index} className="image-block my-6 flex flex-col items-center">
                        {block.src && <img src={block.src} alt={block.alt} className="max-w-full rounded-lg shadow-md" />}
                        <div className="caption mt-2 text-sm text-gray-600">{block.alt}</div>
                      </div>
                    );
                  } else if (block.type === "quote") {
                    return (
                      <div key={index} className="quote my-4 border-l-4 border-gray-300 pl-4 italic text-gray-700">
                        <i className="fa fa-quote-left"></i>
                        <p className="ml-2">{block.content}</p>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </section>
          </div>
        </main>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};

export default TestPage;
