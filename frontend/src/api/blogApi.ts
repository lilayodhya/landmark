import api from "./axios";

export type Blog = {
  id: string;
  slug: string;
  header: string;
  type: string;
  date: string;
  time_to_read: string;
  content: string;
  photo: string;
  created_at: string;
  updated_at: string;
};

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await api.get("/blog");
  return response.data;
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  const response = await api.get(`/blog/${slug}`);
  return response.data;
};