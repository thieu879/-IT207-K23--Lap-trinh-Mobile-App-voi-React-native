import { fetchArticleCategories } from "@/apis/articleCategories";
import type { ArticleCategory } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CategoriesState = {
  items: ArticleCategory[];
  loading: boolean;
  error?: string;
};

const initialState: CategoriesState = {
  items: [],
  loading: false,
};

export const loadCategories = createAsyncThunk(
  "categories/load",
  async () => {
    const res = await fetchArticleCategories({ page: 1, limit: 50 });
    const items: ArticleCategory[] = Array.isArray(res?.items)
      ? res.items
      : res || [];
    return items;
  }
);

const articleCategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default articleCategoriesSlice.reducer;
