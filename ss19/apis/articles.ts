import axiosInstance from "@/utils/axiosInstance";

export type ListParams = {
  page?: number;
  limit?: number;
  categoryId?: number | string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export async function fetchArticles(params: ListParams = {}) {
  const res = await axiosInstance.get(`/articles/all`, { params });
  return res.data?.data ?? res.data;
}

export async function fetchArticleDetail(id: string | number) {
  const res = await axiosInstance.get(`/articles/${id}`);
  return res.data?.data ?? res.data;
}

export async function fetchArticleComments(id: string | number, params: { page?: number; limit?: number } = {}) {
  const { page = 1, limit = 20 } = params;
  const res = await axiosInstance.get(`/articles/${id}/comments`, { params: { page, limit } });
  return res.data?.data ?? res.data;
}

export async function createArticle(payload: any) {
  const res = await axiosInstance.post(`/articles`, payload);
  return res.data?.data ?? res.data;
}

export async function updateArticle(id: string | number, payload: any) {
  const res = await axiosInstance.put(`/articles/${id}`, payload);
  return res.data?.data ?? res.data;
}

export async function deleteArticle(id: string | number) {
  const res = await axiosInstance.delete(`/articles/${id}`);
  return res.data?.data ?? res.data;
}

export async function fetchSavedArticles(params: ListParams = {}) {
  const res = await axiosInstance.get(`/articles/saved`, { params });
  return res.data?.data ?? res.data;
}

export async function toggleSaveArticle(id: string | number) {
  const res = await axiosInstance.post(`/articles/${id}/toggle-save`);
  return res.data?.data ?? res.data;
}

export async function fetchMyArticles(params: ListParams = {}) {
  const res = await axiosInstance.get(`/articles/my`, { params });
  return res.data?.data ?? res.data;
}



