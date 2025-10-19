export type ArticleCategory = {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Article = {
  id: number;
  title: string;
  slug?: string;
  thumbnailUrl?: string;
  content?: string;
  excerpt?: string;
  author?: {
    id?: number;
    name?: string;
    avatarUrl?: string;
  };
  category?: ArticleCategory;
  createdAt?: string;
  updatedAt?: string;
  likesCount?: number;
  commentsCount?: number;
  isSaved?: boolean;
};

export type Comment = {
  id: number;
  content: string;
  createdAt?: string;
  author?: {
    id?: number;
    name?: string;
    avatarUrl?: string;
  };
  replies?: Comment[];
};