import { createSlice } from "@reduxjs/toolkit";

const initialState: { numbers: number[] } = {
  numbers: [],
};

const randomSlice = createSlice({
  name: "random",
  initialState,
  // Hàm xử lý các tác vụ đồng bộ (cập nhật lại state -> Không gọi API)
  reducers: {
    // Định nghĩa các phương thức đồng bộ
    random(state, action) {
      // Thêm dữ liệu vào trong mảng
      state.numbers.push(action.payload); // action.payload là dữ liệu được gửi lên từ component
    },
  },
  // Hàm xử lý các tác vụ bất đồng bộ (cập nhật lại state -> Gọi API)
  extraReducers(builder) {},
});

// Export các thông tin của randomSlice ra bên ngoài
export default randomSlice.reducer; // Làm vậy để bên ngoài hiểu đây là 1 reducer

// Export các phương thức đồng bộ
export const { random } = randomSlice.actions;
