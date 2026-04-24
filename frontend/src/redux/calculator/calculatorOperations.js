import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/api/axiosInstance.js';
import { showLoader, hideLoader } from '../global/globalSlice.js';

export const calculateDailyCalories = createAsyncThunk(
  'calculator/calculate',
  async (formData, thunkAPI) => {
    thunkAPI.dispatch(showLoader());
    try {
      const payload = {
        weight: formData.currentWeight,
        height: formData.height,
        age: formData.age,
        desiredWeight: formData.desiredWeight,
        bloodType: formData.bloodType,
      };

      const { data } = await axiosInstance.post(
        '/products/calculate-daily-calories',
        payload
      );

      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  },
);