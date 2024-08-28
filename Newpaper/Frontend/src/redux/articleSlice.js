import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    getArticle: {
      articles: [],
      loading: false,
      error: false,
    },
    updateArticle: {
      article: null,
      loading: false,
      error: false,
    },
    deleteArticle: {
      article: null,
      loading: false,
      error: false,
    },
    
  },
  reducers: {
    getArticleStart: (state) => {
      state.getArticle.loading = true;
      state.getArticle.error = false;
    },
    getArticleSuccess: (state, action) => {
      state.getArticle.loading = false;
      state.getArticle.articles = action.payload;
    },
    getArticleFailed: (state) => {
      state.getArticle.loading = false;
      state.getArticle.error = true;
    },
    updateArticleStart: (state) => {
      state.updateArticle.loading = true;
      state.updateArticle.error = false;
    },
    updateArticleSuccess: (state, action) => {
      state.updateArticle.loading = false;
      state.updateArticle.article = action.payload;
    },
    updateArticleFailed: (state) => {
      state.updateArticle.loading = false;
      state.updateArticle.error = true;
    },
    deleteArticleStart: (state) => {
    
    }    
,    
    deleteArticleSuccess: (state, action) => {
 
      state.deleteArticle.article = action.payload;
    },
    deleteArticleFailed: (state) => {
  
    },
    
  },
});

export const {
  getArticleStart,
  getArticleSuccess,
  getArticleFailed,
  updateArticleStart,
  updateArticleSuccess,
  updateArticleFailed,
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailed,
} = articleSlice.actions;

export default articleSlice.reducer;
