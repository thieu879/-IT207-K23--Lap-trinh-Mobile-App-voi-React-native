import { createArticle, deleteArticle, fetchMyArticles, updateArticle } from "@/apis/articles";
import type { Article } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type MyArticlesState = {
  items: Article[];
  loading: boolean;
  error?: string;
};

const initialState: MyArticlesState = {
  items: [],
  loading: false,
};

export const loadMyArticles = createAsyncThunk("myArticles/load", async () => {
  const res = await fetchMyArticles({ page: 1, limit: 50 });
  const items: Article[] = Array.isArray(res?.items) ? res.items : res || [];
  return items;
});

export const createMyArticle = createAsyncThunk(
  "myArticles/create",
  async (payload: any) => {
    const res = await createArticle(payload);
    return res as Article;
  }
);

export const updateMyArticle = createAsyncThunk(
  "myArticles/update",
  async ({ id, payload }: { id: string | number; payload: any }) => {
    const res = await updateArticle(id, payload);
    return res as Article;
  }
);

export const deleteMyArticle = createAsyncThunk(
  "myArticles/delete",
  async (id: string | number) => {
    await deleteArticle(id);
    return String(id);
  }
);

const myArticlesSlice = createSlice({
  name: "myArticles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMyArticles.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadMyArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadMyArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMyArticle.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateMyArticle.fulfilled, (state, action) => {
        const idx = state.items.findIndex((x) => x.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(deleteMyArticle.fulfilled, (state, action) => {
        state.items = state.items.filter((x) => String(x.id) !== action.payload);
      });
  },
});

export default myArticlesSlice.reducer;




