import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {
    showLoader(state, action) {
      state.isLoading = action.payload;
    },
    hideLoader(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { showLoader, hideLoader } = globalSlice.actions;
export default globalSlice.reducer;
