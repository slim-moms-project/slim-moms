import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../services/api/axiosInstance.js';
import { showLoader, hideLoader } from '../global/globalSlice.js';

export const calculateDailyCalories = createAsyncThunk(
  'calculator/calculateDailyCalories',
  async (formData, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const { data } = await axiosInstance.post(
        '/products/calculate-daily-calories',
        formData,
      );
      toast.success('Daily calories calculated successfully');
      return data.data; //veri backend tarafında böyle gönderiliyor 
    } catch (error) {
      const message = error.response?.data?.message ?? 'Calculation failed';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  },
);