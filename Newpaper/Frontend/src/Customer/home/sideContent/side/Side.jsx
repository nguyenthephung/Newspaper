import React, { useState } from "react";
import axios from "axios";
import "./side.css";
import "../Tpost/Tpost"
import { useSelector } from "react-redux";
import Heading from "../../../common/heading/Heading";
import { Link } from "react-router-dom";
import Tpost from "../Tpost/Tpost";

const Side = () => {
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const [subscribed, setSubscribed] = useState(user?.Subscribe);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/v1/user/subscribe", {
        userId: user._id, // Sử dụng userId từ biến user
      });

      if (response.status === 200) {
        setSubscribed(response.data.Subscribe);
        alert(`Subscription ${response.data.Subscribe ? "enabled" : "disabled"}!`);
      }
    } catch (error) {
      console.error("There was an error updating subscription:", error);
      alert("Failed to update subscription. Please try again.");
    }
  };
  return (
    <>
     

      <section className="catgorys">
       <Tpost/>
      </section>

      <Heading title="Subscribe" />
      <section className="subscribe">
        <h1 className="title">Subscribe to our New Stories</h1>
        <button onClick={handleSubscribe}>
          <i className="fa fa-paper-plane"></i> SUBSCRIBE
        </button>
      </section>
      <section className="banner banner1">
        <img src="https://adsngoaitroi.vn/wp-content/uploads/2021/05/quang-cao-ngoai-troi-an-tuong-660x330.jpg" alt="Banner 1" />
      </section>
      <section className="banner ">
        <img src="https://thietkemyb.com.vn/wp-content/uploads/2022/10/image5-1.jpg" alt="Banner 2" />
      </section>
      <section className="banner banner3">
        <img src="https://cdn.brvn.vn/editor_news/2013/10/Billboard1-ID2887.jpg" alt="Banner 3" />
      </section>
      <section className="banner banner4">
        <img src="https://trangtridothi.com.vn/Data/upload/images/Bi%E1%BB%83n%20b%E1%BA%A3ng%20qu%E1%BA%A3ng%20c%C3%A1o/bien%20quang%20cao%20bia4.jpg" alt="Banner 4" />
      </section>
      <section className="banner banner5">
        <img src="https://greenway.com.vn/wp-content/uploads/2018/08/chien-dich-quang-cao-milo-nang-dong-viet-nam.jpg" alt="Banner 5" />
      </section>
    </>
  );
};

export default Side;
