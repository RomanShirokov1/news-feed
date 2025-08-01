import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post, PostsResponse } from '@/types/post';
import { fetchPostsApi } from './postsApi';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

const POSTS_PER_PAGE = 10;

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  page: 0,
  hasMore: true,
};

export const fetchPosts = createAsyncThunk<PostsResponse, number, { rejectValue: string }>(
  'posts/fetchPosts',
  async (page, { rejectWithValue }) => {
    try {
      const data = await fetchPostsApi(page);
      return data;
    } catch (err) {
      return rejectWithValue('Ошибка загрузки постов');
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.page = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(...action.payload.posts);
        state.page += 1;
        state.hasMore = action.payload.posts.length === POSTS_PER_PAGE;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  },
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
