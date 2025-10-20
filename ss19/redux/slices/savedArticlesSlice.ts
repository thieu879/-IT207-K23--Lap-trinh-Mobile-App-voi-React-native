import { fetchSavedArticles, toggleSaveArticle } from "@/apis/articles";
import type { Article } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type SavedState = {
  items: Article[];
  loading: boolean;
  error?: string;
};

const initialState: SavedState = {
  items: [],
  loading: false,
};

export const loadSavedArticles = createAsyncThunk(
  "saved/load",
  async () => {
    const res = await fetchSavedArticles({ page: 1, limit: 50 });
    const items: Article[] = Array.isArray(res?.items) ? res.items : res || [];
    return items;
  }
);

export const unsaveArticle = createAsyncThunk(
  "saved/unsave",
  async (id: string | number) => {
    await toggleSaveArticle(id);
    return String(id);
  }
);

const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSavedArticles.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadSavedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadSavedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(unsaveArticle.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter((a) => String(a.id) !== id);
      });
  },
});

export default savedSlice.reducer;




