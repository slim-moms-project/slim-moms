import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/api/axiosInstance.js';
import { showLoader, hideLoader } from '../global/globalSlice.js';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const { data } = await axiosInstance.post('/auth/register', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const { data } = await axiosInstance.post('/auth/login', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  },
);
