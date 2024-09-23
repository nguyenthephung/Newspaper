import axios from "axios";
import { message } from 'antd'; 
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  updateUserInfo
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";
//npm install axios
import {
  getArticleStart,
  getArticleSuccess,
  getArticleFailed,
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailed,
} from "./articleSlice";
import {
  getArticlePendingStart,
  getArticlePendingSuccess,
  getArticlePendingFailed,
  updateArticlePendingStart,
  updateArticlePendingSuccess,
  updateArticlePendingFailed,
}from "./articlePendingSlice";
import {
  getBookMakedStart,     
  getBookMakedSuccess,
  getBookMakedFailed,
} from "./bookMakedSlice"
import {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailed,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailed,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailed,
}from "./categorySlice"

import {
  getTagStart,
  getTagSuccess,
  getTagFailed,
  updateTagStart,
  updateTagSuccess,
  updateTagFailed,
  deleteTagStart,
  deleteTagSuccess,
  deleteTagFailed,
}from "./tagSlice"

import {
  getCommentStart,
  getCommentSuccess,
  getCommentFailed,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailed,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailed,
}from "./commentSlice"

import {
  getRatingStart,
  getRatingSuccess,
  getRatingFailed,
  updateRatingStart,
  updateRatingSuccess,
  updateRatingFailed,
}from "./ratingSlice"
//Auth
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};
export const logOut = async (dispatch,navigate, id, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

//User
export const getAllUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/v1/user");
    const reversedData = res.data.reverse(); 
    dispatch(getUsersSuccess(reversedData ));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};
export const updateUser = async (dispatch,user) => {
  try {
    const response = await axios.post("/v1/user/updateUser", user);
     dispatch(updateUserInfo(user));
    return {
      success: true,
      data: response.data,
      message: 'User updated successfully'
    };
  } catch (err) {
    console.error('Error updating user:', err);

    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;

    if (err.response) {
      // Lỗi từ server với mã trạng thái
      statusCode = err.response.status;
      errorMessage = err.response.data.message || `Server error: ${err.response.status}`;
    } else if (err.request) {
      // Yêu cầu được gửi nhưng không nhận được phản hồi
      errorMessage = 'No response received from server';
    } else {
      // Lỗi xảy ra khi thiết lập yêu cầu
      errorMessage = err.message || 'Error setting up the request';
    }

    return {
      success: false,
      error: errorMessage,
      statusCode: statusCode
    };
  }
};
export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete("/v1/user/" + id);
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};

//Article
export const getArticle = async (dispatch) =>{
   dispatch(getArticleStart());
   try{
    const res= await axios.get("/v1/article/getArticle");
    const reversedData = res.data.reverse(); 
    dispatch(getArticleSuccess(reversedData ));
   }catch(err){
    console.log(err)
    dispatch(getArticleFailed());
   }

};
export const updateArticle = async (dispatch, article) => {
  try {
    const res = await axios.post("/v1/article/updateArticle", article);
    // Xử lý phản hồi thành công nếu cần
    console.log('Article updated successfully:', res.data);
  } catch (err) {
    // Xử lý lỗi từ server
    console.error('Error updating article:', err.response ? err.response.data : err.message);
    // Có thể thông báo lỗi cho người dùng tại đây
  }

};
export const deleteArticle = async (dispatch,id,) =>{
  dispatch(deleteArticleStart());
  try{
   const res= await axios.delete("/v1/article/"+ id);
   dispatch(deleteArticleSuccess(res.data));
  }catch(err){
   dispatch(deleteArticleFailed());
  }
};
export const getArticlePending = async (dispatch) =>{
  dispatch(getArticlePendingStart());
  try{
   const res= await axios.get("/v1/article/getArticlePending");
   const reversedData = res.data.reverse(); 
   dispatch(getArticlePendingSuccess(reversedData));
  }catch(err){
   dispatch(getArticlePendingFailed());
  }

};
export const updateArticlePending = async (dispatch, id, status) => {
  dispatch(updateArticlePendingStart());
  try {
    // Sửa đường dẫn để thêm dấu '/' và truyền status trong body của yêu cầu
    const res = await axios.post(`/v1/article/updateArticlePending/${id}`, { status });
    dispatch(updateArticlePendingSuccess(res.data));
  } catch (err) {
    dispatch(updateArticlePendingFailed());
  }
};
export const getBookMaked = async (dispatch, id) => {
  dispatch(getBookMakedStart());
  try {
    // Sử dụng axios để gửi yêu cầu GET, sử dụng id trong đường dẫn API
    const res = await axios.post(`/v1/article/getBookMaked/${id}`);
    const reversedData = res.data.reverse(); 
    dispatch(getBookMakedSuccess(reversedData));
  } catch (err) {
    dispatch(getBookMakedFailed());
  }
};
//Category
export const getCategories = async (dispatch)=>{
  dispatch(getCategoryStart());
  try{
   const res= await axios.get("/v1/category/getCategory");
   const reversedData = res.data.reverse(); 
   dispatch(getCategorySuccess(reversedData));
  }catch(err){
   dispatch(getCategoryFailed());
  }
}
export const updateCategory = async (dispatch, category) => {
  dispatch(updateCategoryStart());
  try {
    const res = await axios.post("/v1/category/updateCategory", category);
    dispatch(updateCategorySuccess(res.data));
    message.success("Category updated successfully!"); // Thông báo thành công
  } catch (err) {
    dispatch(updateCategoryFailed());

    // Kiểm tra lỗi từ phía server hay client
    if (err.response) {
      // Lỗi từ phía server
      message.error(`Server Error: ${err.response.data.error || err.response.statusText}`);
    } else if (err.request) {
      // Không nhận được phản hồi từ phía server
      message.error("No response from server. Please try again later.");
    } else {
      // Lỗi khác từ phía client
      message.error(`Client Error: ${err.message}`);
    }
  }
};
export const deleteCategory = async (dispatch,id,) =>{
  dispatch(deleteCategoryStart());
  try{
   const res= await axios.delete("/v1/category/"+ id);
   dispatch(deleteCategorySuccess(res.data));
  }catch(err){
   dispatch(deleteCategoryFailed());
  }
};

//Tags
export const getTag = async (dispatch) => {
  dispatch(getTagStart());
  try {
    const res = await axios.get("/v1/tag/getTag");
    const reversedData = res.data.reverse(); 
    dispatch(getTagSuccess(reversedData ));
  } catch (err) {
    dispatch(getTagFailed());
  }
};

export const updateTag = async (dispatch, tag) => {
  dispatch(updateTagStart());
  try {
    const res = await axios.post("/v1/tag/updateTag", tag);
    dispatch(updateTagSuccess(res.data));
  } catch (err) {
    dispatch(updateTagFailed());
  }
};

export const deleteTag = async (dispatch, id) => {
  dispatch(deleteTagStart());
  try {
    const res = await axios.delete(`/v1/tag/${id}`);
    dispatch(deleteTagSuccess(res.data));
  } catch (err) {
    dispatch(deleteTagFailed());
  }
};

//Comment
export const getComment = async (dispatch) => {
  dispatch(getCommentStart());
  try {
    const res = await axios.get("/v1/comment/getComment");
    dispatch(getCommentSuccess(res.data));
  } catch (err) {
    dispatch(getCommentFailed());
  }
};
export const updateComment = async (dispatch, comment) => {
  dispatch(updateCommentStart());
  try {
    const res = await axios.post("/v1/comment/updateComment", comment);
    dispatch(updateCommentSuccess(res.data));
  } catch (err) {
    dispatch(updateCommentFailed());
  }
};
export const deleteComment = async (dispatch, id) => {
  dispatch(deleteCommentStart());
  try {
    const res = await axios.delete(`/v1/comment/${id}`);
    dispatch(deleteCommentSuccess(res.data));
  } catch (err) {
    dispatch(deleteCommentFailed());
  }
};

//Rating
export const getRating = async (dispatch) => {
  dispatch(getRatingStart());
  try {
    const res = await axios.get("/v1/rating/getRating");
    dispatch(getRatingSuccess(res.data));
  } catch (err) {
    dispatch(getRatingFailed());
  }
};
export const updateRating = async (dispatch, rating) => {
  dispatch(updateRatingStart());
  try {
    const res = await axios.post("/v1/rating/updateRating", rating);
    dispatch(updateRatingSuccess(res.data));
  } catch (err) {
    dispatch(updateRatingFailed());
  }
};
