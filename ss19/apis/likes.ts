import axiosInstance from "@/utils/axiosInstance";

export async function toggleLike(payload: { articleId?: string | number; commentId?: string | number }) {
  const res = await axiosInstance.post(`/likes/toggle`, payload);
  return res.data?.data ?? res.data;
}

export async function getArticleLikers(articleId: string | number, params: { page?: number; limit?: number } = {}) {
  const { page = 1, limit = 50 } = params;
  const res = await axiosInstance.get(`/likes/article/${articleId}`, { params: { page, limit } });
  return res.data?.data ?? res.data;
}

export async function getCommentLikers(commentId: string | number, params: { page?: number; limit?: number } = {}) {
  const { page = 1, limit = 50 } = params;
  const res = await axiosInstance.get(`/likes/comment/${commentId}`, { params: { page, limit } });
  return res.data?.data ?? res.data;
}



