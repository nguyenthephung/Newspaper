import { createSlice } from "@reduxjs/toolkit";

const articlePendingSlice = createSlice({
  name: "articlePending",
  initialState: {
    getArticlePending: {
      articlesPending: [], // Khởi tạo đúng với mảng trống
      loading: false,
      error: false,
    },
    updateArticlePending: {
      articlesPending: null,
      loading: false,
      error: false,
    },
  },
  reducers: {
    // Reducers cho getArticlePending
    getArticlePendingStart: (state) => {
      state.getArticlePending.loading = true;
      state.getArticlePending.error = false;
    },
    getArticlePendingSuccess: (state, action) => {
      state.getArticlePending.loading = false;
      state.getArticlePending.articlesPending = action.payload;
    },
    getArticlePendingFailed: (state) => {
      state.getArticlePending.loading = false;
      state.getArticlePending.error = true;
    },

    // Reducers cho updateArticlePending
    updateArticlePendingStart: (state) => {
      state.updateArticlePending.loading = true;
      state.updateArticlePending.error = false;
    },
    updateArticlePendingSuccess: (state, action) => {
      state.updateArticlePending.loading = false;
      state.updateArticlePending.articlesPending = action.payload;
    },
    updateArticlePendingFailed: (state) => {
      state.updateArticlePending.loading = false;
      state.updateArticlePending.error = true;
    },


  },
});

export const {
  getArticlePendingStart,
  getArticlePendingSuccess,
  getArticlePendingFailed,
  updateArticlePendingStart,
  updateArticlePendingSuccess,
  updateArticlePendingFailed,
 
} = articlePendingSlice.actions;

export default articlePendingSlice.reducer;
