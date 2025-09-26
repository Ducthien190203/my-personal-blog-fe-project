import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  slug: string;
  publishedAt: string;
  categoryId: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
}

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

// Initial state
const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

// Posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentPost: (state, action: PayloadAction<Post | null>) => {
      state.currentPost = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    setPagination: (state, action: PayloadAction<{ totalPages: number; currentPage: number }>) => {
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const {
  setLoading,
  setError,
  setPosts,
  setCurrentPost,
  addPost,
  updatePost,
  deletePost,
  setPagination,
} = postsSlice.actions;

export default postsSlice.reducer;