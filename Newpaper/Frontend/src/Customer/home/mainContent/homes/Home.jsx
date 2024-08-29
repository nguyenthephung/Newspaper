import React from "react";
import Side from "../../sideContent/side/Side";
import Popular from "../popular/Popular";
import Ppost from "./Ppost/Ppost";
import ForYou from "./ForYou/ForYou";
import Interested from "./interested/interested";
import DailyCategory from "./DailyCategory/DailyCategory";
import { useSelector } from "react-redux";
import "./style.css";

const Homes = () => {
  // Lấy thông tin user từ Redux store
  const user = useSelector((state) => state.auth?.login?.currentUser);
  
  // Kiểm tra xem preferences tồn tại, là một mảng, và không rỗng
  const showForYou = user?.preferences && Array.isArray(user.preferences) && user.preferences.length > 0;

  return (
    <>
      <main>
        <div className='container'>
          <section className='mainContent'>
            <Popular />
            <Ppost />
            {/* Chỉ hiển thị ForYou khi user.preferences tồn tại, là một mảng và không rỗng */}
            {showForYou && <ForYou />}
            <Interested />
            <DailyCategory />
          </section>
          <section className='sideContent'>
            <Side />
          </section>
        </div>
      </main>
    </>
  );
}

export default Homes;
