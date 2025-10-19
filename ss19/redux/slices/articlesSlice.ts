import { fetchArticleDetail, fetchArticles } from "@/apis/articles";
import { getCommentsByArticle } from "@/apis/comments";
import type { Article, Comment } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ArticlesState = {
  list: Article[];
  listLoading: boolean;
  detail?: Article | null;
  detailLoading: boolean;
  comments: Comment[];
  commentsLoading: boolean;
  error?: string;
};

const initialState: ArticlesState = {
  list: [],
  listLoading: false,
  detail: null,
  detailLoading: false,
  comments: [],
  commentsLoading: false,
};

export const loadArticles = createAsyncThunk(
  "articles/loadArticles",
  async () => {
    const res = await fetchArticles({ page: 1, limit: 20 });
    const items: Article[] = Array.isArray(res?.items) ? res.items : res || [];
    return items;
  }
);

export const loadArticleDetail = createAsyncThunk(
  "articles/loadDetail",
  async (id: string | number) => {
    const res = await fetchArticleDetail(id);
    return res as Article;
  }
);

export const loadArticleComments = createAsyncThunk(
  "articles/loadComments",
  async (id: string | number) => {
    const res = await getCommentsByArticle(id, { page: 1, limit: 50 });
    const items: Comment[] = Array.isArray(res?.items) ? res.items : res || [];
    return items;
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    resetDetail(state) {
      state.detail = null;
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // list
      .addCase(loadArticles.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(loadArticles.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.error.message;
      })
      // detail
      .addCase(loadArticleDetail.pending, (state) => {
        state.detailLoading = true;
      })
      .addCase(loadArticleDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detail = action.payload;
      })
      .addCase(loadArticleDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.error.message;
      })
      // comments
      .addCase(loadArticleComments.pending, (state) => {
        state.commentsLoading = true;
      })
      .addCase(loadArticleComments.fulfilled, (state, action) => {
        state.commentsLoading = false;
        state.comments = action.payload;
      })
      .addCase(loadArticleComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetDetail } = articlesSlice.actions;
export default articlesSlice.reducer;



