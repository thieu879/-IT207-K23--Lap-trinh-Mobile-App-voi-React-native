import axiosInstance from "@/utils/axiosInstance";

export async function getCommentsByArticle(articleId: string | number, params: { page?: number; limit?: number } = {}) {
  const { page = 1, limit = 50 } = params;
  const res = await axiosInstance.get(`/comments/article/${articleId}`, {
    params: { page, limit },
  });
  return res.data?.data ?? res.data;
}

export async function createComment(payload: { articleId: string | number; content: string; parentId?: string | number }) {
  const res = await axiosInstance.post(`/comments`, payload);
  return res.data?.data ?? res.data;
}

export async function updateComment(id: string | number, payload: { content: string }) {
  const res = await axiosInstance.put(`/comments/${id}`, payload);
  return res.data?.data ?? res.data;
}

export async function deleteCommentApi(id: string | number) {
  const res = await axiosInstance.delete(`/comments/${id}`);
  return res.data?.data ?? res.data;
}



