import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../common/heading/Heading";
import "./style.css";

// Dữ liệu mẫu về các tags với cover, tag và category
const discover = [
  {
    cover: '/images/Tags/chinhtri.jpg',
    tag: 'Chính trị',
    category: 'Thời sự'
  },
  {
    cover: '/images/Tags/suckhoe.jpg',
    tag: 'Sức khỏe',
    category: 'Sức khỏe'
  },
  {
    cover: '/images/Tags/khoahoc.jpeg',
    tag: 'Khoa học',
    category: 'Khoa học'
  },
  {
    cover: '/images/Tags/giaitri.jpg',
    tag: 'Giải trí',
    category: 'Chính trị'
  },
  {
    cover: '/images/Tags/nghethuat.jpg',
    tag: 'Nghệ thuật',
    category: 'Nghệ thuật'
  },
  {
    cover: '/images/Tags/dulich.jpg',
    tag: 'Du lịch',
    category: 'Nghệ thuật'
  }
];

const Discover = () => {
  return (
    <>
      <section className='discover'>
        <div className='container'>
          <Heading title='Thẻ hot' />
          <div className='content'>
            {discover.map((val, index) => {
              // Mã hóa các giá trị của category và tag
              const encodedCategory = encodeURIComponent(val.category);
              const encodedTag = encodeURIComponent(val.tag);
              return (
                <Link to={`/${encodedCategory}/${encodedTag}`} key={index} className='box'>
                  <div className='img'>
                    <img src={val.cover} alt={val.tag} />
                  </div>
                  <h1 className='title'>{val.tag}</h1>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Discover;
