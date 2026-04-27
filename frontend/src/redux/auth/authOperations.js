import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from '../../services/api/axiosInstance.js';

import { showLoader, hideLoader } from '../global/globalSlice.js';


export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(showLoader());

    try {
      const { data } = await axiosInstance.post(
        '/api/auth/register',
        credentials
      );

      toast.success(data.message || 'Account created successfully!');

      return data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed';

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(showLoader());

    try {
      const { data } = await axiosInstance.post(
        '/api/auth/login',
        credentials
      );

      setAuthHeader(data.data.token);

      toast.success(data.message || 'Welcome back!');

      return data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed';

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(showLoader());

    try {
      const { data } = await axiosInstance.post('/api/auth/logout');

      clearAuthHeader();

      toast.success(data.message || 'Logged out successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Logout failed';

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);
