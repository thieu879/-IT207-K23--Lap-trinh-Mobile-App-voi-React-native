import { Product } from "@/types";
import axiosInstance from "../utils/axiosInstance";

// lấy toàn bộ sản phẩm
export const fetchProducts = async ():Promise<Product[]> => {
  const response = await axiosInstance.get("/products/all");
  return response.data.data;
}

// xem chi tiết sản phẩm theo ID
export const fetchProductById = async (id: string):Promise<Product> => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data.data;
}

// thêm sản phẩm vào giỏ hàng
export const addToCart = async (productId: string, quantity: number):Promise<void> => {
  await axiosInstance.post("/carts/add", { productId, quantity });
}

// cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItem = async (productId: string, quantity: number):Promise<void> => {
  await axiosInstance.put(`/carts/items/${productId}`, { quantity });
}

// xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (productId: string):Promise<void> => {
  await axiosInstance.delete(`/carts/items/${productId}`);
}

// xoá toàn bộ giỏ hàng
export const clearCart = async (): Promise<void> => {
    await axiosInstance.delete("/carts/clear");
};