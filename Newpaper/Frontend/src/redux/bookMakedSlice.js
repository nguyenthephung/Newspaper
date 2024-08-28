import { createSlice } from "@reduxjs/toolkit";

const articlePendingSlice = createSlice({
  name: "bookMaked",
  initialState: {
 
    getBookMaked: {
      bookMaked: [],
      loading: false,
      error: false,
    }
  },
  reducers: {
    // Reducers cho getBookMaked
    getBookMakedStart: (state) => {
      state.getBookMaked.loading = true;
      state.getBookMaked.error = false;
    },
    getBookMakedSuccess: (state, action) => {
      state.getBookMaked.loading = false;
      state.getBookMaked.bookMaked = action.payload;
    },
    getBookMakedFailed: (state) => {
      state.getBookMaked.loading = false;
      state.getBookMaked.error = true;
    },
  },
});

export const {

  getBookMakedStart,      // Export các action mới
  getBookMakedSuccess,
  getBookMakedFailed,
} = articlePendingSlice.actions;

export default articlePendingSlice.reducer;
