import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// Categories slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(cat => cat.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;