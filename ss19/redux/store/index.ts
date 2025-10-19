import categories from '@/redux/slices/articleCategoriesSlice';
import articles from '@/redux/slices/articlesSlice';
import myArticles from '@/redux/slices/myArticlesSlice';
import saved from '@/redux/slices/savedArticlesSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        categories,
        articles,
        saved,
        myArticles,
    },
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;