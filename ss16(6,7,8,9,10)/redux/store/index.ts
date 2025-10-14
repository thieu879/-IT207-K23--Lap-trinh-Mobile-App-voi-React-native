import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slices/counter.slice";
import positionSlice from "../slices/position.slice";
import randomSlice from "../slices/random.slice";

// Khởi tạo store cho toàn bộ ứng dụng
const store = configureStore({
  reducer: {
    counter: counterSlice,
    random: randomSlice,
    position: positionSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
