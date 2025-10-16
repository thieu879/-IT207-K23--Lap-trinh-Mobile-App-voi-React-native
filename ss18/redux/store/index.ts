import productsReducer from "@/redux/slices/productSlice";
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;