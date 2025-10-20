import axiosInstance from "@/utils/axiosInstance";

export async function fetchArticleCategories(params?: { page?: number; limit?: number }) {
  const { page = 1, limit = 50 } = params || {};
  const res = await axiosInstance.get(`/article-categories/all`, {
    params: { page, limit },
  });
  return res.data?.data ?? res.data;
}



