import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

interface TagsState {
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
};

// Tags slice
const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      state.tags.push(action.payload);
    },
    updateTag: (state, action: PayloadAction<Tag>) => {
      const index = state.tags.findIndex(tag => tag.id === action.payload.id);
      if (index !== -1) {
        state.tags[index] = action.payload;
      }
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter(tag => tag.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setTags,
  addTag,
  updateTag,
  deleteTag,
} = tagsSlice.actions;

export default tagsSlice.reducer;