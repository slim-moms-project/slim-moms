import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
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
      const { data } = await axiosInstance.post('/auth/register', credentials);

      if (data.token) {
        setAuthHeader(data.token);
      }

      toast.success('Account created successfully!');

      return data;
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
      const { data } = await axiosInstance.post('/auth/login', credentials);

      if (data.token) {
        setAuthHeader(data.token);
      }

      toast.success('Welcome back!');

      return data;
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
      await axiosInstance.post('/auth/logout');

      clearAuthHeader();

      toast.success('Logged out successfully!');

    } catch (error) {
      const message =
        error.response?.data?.message || 'Logout failed';

      toast.error(message);

      return thunkAPI.rejectWithValue(message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);
