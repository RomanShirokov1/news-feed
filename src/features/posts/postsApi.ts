import { PostsResponse } from '@/types/post';

const BASE_URL = 'https://dummyjson.com';

export const fetchPostsApi = async (page: number, limit: number = 10): Promise<PostsResponse> => {
  const skip = page * limit;

  const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error('Ошибка загрузки постов');
  }

  const data: PostsResponse = await response.json();
  return data;
};
