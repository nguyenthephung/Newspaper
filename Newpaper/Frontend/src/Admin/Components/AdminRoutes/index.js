import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "../../Pages/Users";
import Dashboard from "../../Pages/Dashboard";
import Article from "../../Pages/Article";
import ReviewArtic from "../../Pages/ReviewArtic";
import Categoy from "../../Pages/Category"
import ReviewWriterRequests from "../../Pages/ReviewWriterRequests/ReviewWriterRequests";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<Dashboard />}></Route>
      <Route path="/admin/article" element={<Article />}></Route>
      <Route path="/admin/review" element={<ReviewArtic />}></Route>
      <Route path="/admin/user" element={<Users />}></Route>
      <Route path="/admin/category" element={<Categoy />}></Route>
      <Route path="/admin/ReviewWriterRequests" element={<ReviewWriterRequests />}></Route>
    </Routes>
  );
}
export default AppRoutes;